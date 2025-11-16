<template>
  <div class="cadastro-container">
    <div class="cadastro-box">
      <h2>Criar Nova Conta</h2>
      
      <form @submit.prevent="handleCadastro">
      
      <label for="nome">Nome:</label>
      <input type="text" id="nome" placeholder="Nome" v-model="nome" required>
      
      <label for="email">E-mail:</label>
      <input type="email" id="email" placeholder="E-mail" v-model="email" required>
      
      <label for="usuario">Usuário:</label>
      <input type="text" id="usuario" placeholder="Usuário" v-model="usuario" required>
      
      <label for="senha">Senha:</label>
      <input type="password" id="senha" placeholder="Senha" v-model="senha" required>

      <label for="confirmarSenha">Confirmar Senha:</label>
      <input 
        type="password" 
        id="confirmarSenha" 
        placeholder="Confirme sua senha" 
        v-model="confirmarSenha" 
        required
      >
      <label for="cargo">Cargo:</label>
      <select id="cargo" v-model="cargo" required>
        <option disabled value="">Selecione um cargo</option>
        <option value="administrador">Administrador</option>
        <option value="garcom">Garçom</option>
      </select>
      
      <button type="submit">Cadastrar</button>
    </form>
        <router-link to="/" class="voltar-login">
          Já tem uma conta? Voltar para o login
        </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nome = ref('');
const email = ref('');
const usuario = ref('');
const senha = ref('');
const confirmarSenha = ref(''); 
const cargo = ref(''); 
 
const router = useRouter();

const handleCadastro = () => {
  if (!cargo.value) {
    alert('Por favor, selecione um cargo.');
    return;
  }

  if (senha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem.');
    return;
  }

  console.log('Novo cadastro:');
  console.log('Nome:', nome.value);
  console.log('Email:', email.value);
  console.log('Usuário:', usuario.value);
  console.log('Senha:', senha.value); 
  console.log('Cargo:', cargo.value);

  alert(`Usuário ${nome.value} (${cargo.value}) cadastrado!`);
  router.push({ name: 'TelaMesa' }); 
};
</script>

<style scoped>
.cadastro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px 0; 
}

.cadastro-box {
  background-color: #fff;
  width: 430px;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input, select {
  display: block;
  width: 100%;
  padding: 10px;
  box-sizing: border-box; 
  
  background-color: #fff;   
  border: 1px solid #ddd;   
  border-radius: 6px;       
  
  font-size: 14px;
  outline: none; 
  transition: border 0.2s;
}

input:focus, select:focus {
  border-color: #ff7b00;
}

label {
  text-align: left;
  font-size: 14px;
  color: #555;
  margin-top: 5px; 
}
button {
  background-color: #ff7b00;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  margin-top: 10px; 
}

button:hover {
  background-color: #e96b00;
} 

select option[value=""] {
  color: #999;
}


input:focus, select:focus {
  border-color: #ff7b00;
}

.button-cadastro {
  background-color: #ff7b00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  margin-top: 10px;
}

.button-cadastro:hover {
  background-color: #e96b00;
}

.voltar-login {
  display: block; 
  text-align: center;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
  margin-top: 15px;
  transition: color 0.2s;
}

.voltar-login:hover {
  text-decoration: underline;
  color: #ff7b00;
}
</style>