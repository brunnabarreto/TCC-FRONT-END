import { defineStore } from 'pinia'
import api from './api'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  }),

  actions: {
    async login(email, senha) {
      try {
        const response = await api.post('/auth/login', { email, senha })

        const token = response.data.token
        const user = jwtDecode(token)

        // Salva nos estados
        this.token = token
        this.user = user

        // Salva no localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Injeta no axios para próximas requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return true
      } catch (err) {
        console.error('Erro no login:', err)
        return false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete api.defaults.headers.common['Authorization']
    },

    isAuthenticated() {
      return !!this.token
    }
  }
})
