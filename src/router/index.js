import { createRouter, createWebHistory } from 'vue-router'

// Importando suas telas
import Login from '../views/login.vue'
import CadastroUsuario from '../views/CadastroUsuario.vue'
import CadastroProdutos from '../views/CadastroProdutos.vue'



// Definindo as rotas

const routes = [
  { path: '/', component: Login },
  { path: '/cadastro', component: CadastroUsuario },
  { path: '/cadastro-produtos', component: CadastroProdutos }, // <-- CORRIGIDO


]


// Criando o router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
