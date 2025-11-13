<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <img :src="logoUrl" alt="RestApp Logo">
      </div>
      <form @submit.prevent="handleLogin">
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Digite seu email" v-model="email">

        <label for="senha">Senha:</label>
        <input type="password" id="senha" placeholder="Digite sua senha" v-model="senha">

        <a href="#" class="esquec-senha">Esqueci minha senha</a>

        <button type="submit" class="button-login">Login</button>
      </form>
      <router-link to="/cadastro" class="cadastroUsuario">
          Ainda não tem cadastro? Clique aqui
        </router-link>

    
    </div>
    <p class="version">ResTapp - versão 0.11</p>
  </div>
</template>

<script setup>
// Importa 'ref' do Vue para criar variáveis reativas
import { ref } from 'vue';

// Importa a imagem do logo.
// 1. Crie uma pasta 'src/assets/' no seu projeto Vue.
// 2. Coloque o seu arquivo 'logo (1).png' dentro dela.
// 3. Este caminho ('../assets/...') assume que 'Login.vue' está em 'src/components/'.
//    Ajuste o caminho se necessário.
import logoUrl from '@/assets/logo.png'; 

// 'ref' é usado para criar variáveis reativas que o Vue pode monitorar.
const email = ref('');
const senha = ref('');

// Esta é a função que será chamada quando o formulário for enviado
const handleLogin = () => {
  // Por enquanto, apenas exibimos os valores no console e um alerta.
  // Aqui você colocaria sua lógica real de login (ex: chamada de API).
  console.log('Tentativa de login com:');
  console.log('Email:', email.value);
  console.log('Senha:', senha.value);
  
  alert(`Login com: ${email.value}`);
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Fundo laranja e centralização vêm do seu 'body' original */
body {
  background: linear-gradient(90deg, #ff7b00, #ff8c1a);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
/* Container principal */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Caixa branca de login */
.login-box {
  background-color: #fff;
  width: 430px;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  text-align: center;
}

/* Logo circular */
.logo img {
  width: 250px;
  height: 180px;
 
}

/* Inputs */
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
}

label {
  text-align: left; 
  font-size: 14px;
  color: #555;

}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border 0.2s;
  background-color: rgb(228, 228, 228);
}


input:focus {
  border-color: #ff7b00;
}

/* Link 'esqueci minha senha' */
.esquec-senha {
  text-align: right;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
}

.esquec-senha:hover {
  text-decoration: underline;
  .novo-cadastro {
  text-align: center;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
  margin-top: 8px; /* Dá um espacinho entre ele e o link de cima */
  transition: color 0.2s;
}

.cadastroUsuario:hover {
  text-decoration: underline;
  color: #ff7b00; /* Cor do tema */
}
}
.cadastroUsuario {
  text-align: center;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
  margin-top: 8px; /* Dá um espacinho entre ele e o link de cima */
  transition: color 0.2s;
}

.cadastroUsuario:hover {
  text-decoration: underline;
  color: #ff7b00; /* Cor do tema */
}
/* Botão de login */
.button-login {
  background-color: #ff7b00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.button-login:hover {
  background-color: #e96b00;
}

/* Texto de versão */
.version {
  color: #fff;
  font-size: 12px;
  margin-top: 20px;
  opacity: 0.8;
}
</style>