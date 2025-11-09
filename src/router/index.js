import { createRouter, createWebHistory } from 'vue-router'

// Importando suas telas
import Home from '../views/Home.vue'
import CadastroUsuario from '../views/CadastroUsuario.vue'
import login from '../views/login.vue'
import CadastroProdutos from '../views/CadastroProdutos.vue'
import Login from '../views/login.vue'
import financeiro from '../views/financeiro.vue'

// Definindo as rotas

const routes = [
  { path: '/', component: Home },
  { path: '/cadastro', component: CadastroUsuario },
  { path: '/login', component: Login },
  { path: '/cadastro-produtos', component: CadastroProdutos }, // <-- CORRIGIDO
  { path: '/financeiro', component: financeiro }

]


// Criando o router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
