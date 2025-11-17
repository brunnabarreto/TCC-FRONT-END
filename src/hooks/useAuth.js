import { useAuthStore } from '@/stores/authStore'

export const useAuth = () => {
  const authStore = useAuthStore()

  return {
    user: authStore.user,
    token: authStore.token,
    loading: authStore.loading,
    isAuthenticated: authStore.isAuthenticated,
    isTokenExpired: authStore.isTokenExpired,
    login: authStore.login,
    logout: authStore.logout,
    refreshToken: authStore.refreshToken,
  }
}
