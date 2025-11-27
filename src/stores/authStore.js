// import { defineStore } from 'pinia'
// import * as jwtDecode from 'jwt-decode'
// import { loginRequest } from '../services/auth'
// import api from '../services/api' // Axios já configurado

// export const useAuthStore = defineStore('authStore', {
//   state: () => ({
//     token: localStorage.getItem('token') || null,
//     user: localStorage.getItem('token')
//       ? jwtDecode(localStorage.getItem('token'))
//       : null
//   }),

//   actions: {
//     // 🔹 Faz login e salva token
//     async login(email, senha) {
//       try {
//         const response = await loginRequest(email, senha)

//         const token = response.token
//         this.token = token

//         // Decodifica para pegar dados do usuário
//         this.user = jwtDecode(token)

//         // Salva no localStorage
//         localStorage.setItem('token', token)

//         // Adiciona o token no header de todas as requisições Axios
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`

//         return true
//       } catch (err) {
//         console.error('Erro no login:', err)
//         return false
//       }
//     },

//     // 🔹 Faz logout
//     logout() {
//       this.token = null
//       this.user = null
//       localStorage.removeItem('token')

//       // Remove token do header Axios
//       delete api.defaults.headers.common['Authorization']
//     },

//     // 🔹 Verifica se o usuário está logado
//     isAuthenticated() {
//       return !!this.token
//     }
//   }
// })
