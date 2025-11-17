import { useAuthStore } from '@/stores/authStore'

export const requireAuth = (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && !authStore.isTokenExpired) {
    next()
  } else {
    // Redireciona para login se não autenticado
    next('/login')
  }
}

export default requireAuth
