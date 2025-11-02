import { createRouter, createWebHistory } from 'vue-router'

// Importando suas telas
import Home from '../views/Home.vue'
import CadastroUsuario from '../views/CadastroUsuario.vue'
import Perfil from '../views/Perfil.vue'

// Definindo as rotas
const routes = [
  { path: '/', component: Home },
  { path: '/cadastro', component: CadastroUsuario },
  { path: '/perfil', component: Perfil }
]

// Criando o router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
