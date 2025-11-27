import { createRouter, createWebHistory } from 'vue-router'

// Importação das telas (Verifique se os nomes dos arquivos estão exatos)
import Login from '../views/LoginPage.vue'
import CadastroUsuario from '../views/cadastroUsuario.vue'
import CadastroProdutos from '../views/CadastroProdutos.vue'
import TelaMesa from '../views/TelaMesa.vue'
import Financeiro from '../views/financeiro.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cadastro-usuario',
    name: 'CadastroUsuario',
    component: CadastroUsuario,
  },
  {
    // Mudei de '/cadastro-produtos' para '/produtos' para facilitar
    path: '/produtos',
    name: 'Produtos',
    component: CadastroProdutos,
  },
  {
    // Mudei de '/tela-mesa' para '/mesa'
    path: '/mesa',
    name: 'Mesa',
    component: TelaMesa,
  },
  {
    path: '/financeiro',
    name: 'Financeiro',
    component: Financeiro,
  },
  // Rotas "fantasmas" para os botões que ainda não têm tela (para não dar erro)
  { path: '/beneficios', name: 'Beneficios', component: TelaMesa }, // Redireciona p/ mesa provisoriamente
  { path: '/relatorios', name: 'Relatorios', component: TelaMesa },
  { path: '/configuracoes', name: 'Configuracoes', component: TelaMesa },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
