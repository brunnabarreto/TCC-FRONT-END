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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logoUrl from '@/assets//logo.png'; 


const email = ref('');
const senha = ref('');
const router = useRouter();
const handleLogin = () => {
  console.log('Tentativa de login com:');
  console.log('Email:', email.value);
  console.log('Senha:', senha.value);
 
  router.push({ name: 'TelaMesa' });
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: linear-gradient(90deg, #ff7b00, #ff8c1a);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.login-box {
  background-color: #fff;
  width: 430px;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  text-align: center;
}

.logo img {
  width: 250px;
  height: 180px;

}

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

.esquec-senha {
  text-align: right;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
}

.esquec-senha:hover {
  text-decoration: underline;
}
  .novo-cadastro {
  text-align: center;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
  margin-top: 8px; 
  transition: color 0.2s;
}

.cadastroUsuario:hover {
  text-decoration: underline;
  color: #ff7b00; 
}

.cadastroUsuario {
  text-align: center;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
  margin-top: 8px; 
  transition: color 0.2s;
}

.cadastroUsuario:hover {
  text-decoration: underline;
  color: #ff7b00; 
}
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

.version {
  color: #fff;
  font-size: 12px;
  margin-top: 20px;
  opacity: 0.8;
}
</style>