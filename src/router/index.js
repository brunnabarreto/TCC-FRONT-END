import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import Login from '../views/login.vue'
import CadastroUsuario from '../views/CadastroUsuario.vue'
import TelaMesa from '../views/TelaMesa.vue'
import CadastroProdutos from '../views/CadastroProdutos.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'CadastroUsuario',
    component: CadastroUsuario
  },
  {
    path: '/cadastro-produtos',
    name: 'CadastroProdutos',
    component: CadastroProdutos,
    meta: { requiresAuth: true }
  },
  {
    path: '/tela-mesa',
    name: 'TelaMesa',
    component: TelaMesa,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard de autenticação global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    const temToken = !!authStore.token
    const naoExpirou = !authStore.isTokenExpired
    const temUsuario = !!authStore.user

    if (temToken && naoExpirou && temUsuario) {
      next()
    } else {
      authStore.logout()
      next('/login')
    }
  } else if (to.path === '/login' && authStore.isAuthenticated && !authStore.isTokenExpired) {
    next('/tela-mesa')
  } else {
    next()
  }
})

export default router
