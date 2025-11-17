import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)
  const loading = ref(true)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isTokenExpired = computed(() => {
    if (!token.value) return true
    try {
      const decoded = jwtDecode(token.value)
      return decoded.exp * 1000 < Date.now()
    } catch {
      return true
    }
  })

  // Actions
  const initializeAuth = () => {
    if (token.value) {
      try {
        const decoded = jwtDecode(token.value)

        // Verifica se o token não está expirado
        if (decoded.exp * 1000 > Date.now()) {
          user.value = {
            email: decoded.sub,
            // Adicione outros campos que estejam no token
          }
        } else {
          // Token expirado
          logout()
        }
      } catch (error) {
        console.error('Token inválido:', error)
        logout()
      }
    }
    loading.value = false
  }

  const login = async (email, senha) => {
    try {
      loading.value = true
      const response = await api.post('/auth/login', { email, senha })
      const { token: newToken } = response.data

      if (!newToken) {
        throw new Error('Nenhum token recebido do servidor')
      }

      const decoded = jwtDecode(newToken)

      if (decoded.exp * 1000 < Date.now()) {
        throw new Error('Token recebido já está expirado')
      }

      token.value = newToken
      localStorage.setItem('token', newToken)

      user.value = {
        email: decoded.sub,
      }

      return { success: true }
    } catch (error) {
      console.error('Falha no login:', error)
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  const refreshToken = async () => {
    try {
      // Implemente a lógica de refresh do seu backend
      const response = await api.post('/auth/refresh', { token: token.value })
      const { token: newToken } = response.data

      token.value = newToken
      localStorage.setItem('token', newToken)
      return newToken
    } catch (error) {
      console.error('Falha ao renovar token:', error)
      logout()
      throw error
    }
  }

  return {
    token,
    user,
    loading,
    isAuthenticated,
    isTokenExpired,
    initializeAuth,
    login,
    logout,
    refreshToken
  }
})
