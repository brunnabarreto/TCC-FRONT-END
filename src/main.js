import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Criando a aplicação e usando o router
createApp(App)
  .use(router)
  .mount('#app')
