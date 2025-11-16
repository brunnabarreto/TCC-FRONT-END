import { createRouter, createWebHistory } from 'vue-router'

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
    component: CadastroProdutos 
  }, 
 { 
    path: '/tela-mesa', 
    name: 'TelaMesa', 
    component: TelaMesa 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router