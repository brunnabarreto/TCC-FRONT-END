<template>
  <div class="cadastro-container">
    <div class="cadastro-box">
      <h2>Criar Nova Conta</h2>

      <form @submit.prevent="handleCadastro">
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" placeholder="Nome completo" v-model="nome" required />
        </div>

        <div class="input-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" placeholder="seu@email.com" v-model="email" required />
        </div>

        <div class="input-group">
          <label for="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            placeholder="Nome de usuário"
            v-model="usuario"
            required
          />
        </div>

        <div class="input-group">
          <label for="senha">Senha:</label>
          <input type="password" id="senha" placeholder="Sua senha" v-model="senha" required />
        </div>

        <div class="input-group">
          <label for="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            placeholder="Confirme sua senha"
            v-model="confirmarSenha"
            required
          />
        </div>

        <div class="input-group">
          <label for="cargo">Cargo:</label>
          <select id="cargo" v-model="cargo" required>
            <option disabled value="">Selecione um cargo</option>
            <option value="administrador">Administrador</option>
            <option value="garcom">Garçom</option>
          </select>
        </div>

        <button type="submit" class="btn-cadastrar">Cadastrar</button>
      </form>

      <router-link to="/" class="voltar-login"> Já tem uma conta? Voltar para o login </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const nome = ref('')
const email = ref('')
const usuario = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const cargo = ref('')

const router = useRouter()

const handleCadastro = () => {
  if (!cargo.value) {
    alert('Por favor, selecione um cargo.')
    return
  }

  if (senha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem.')
    return
  }

  console.log('Novo cadastro:', {
    nome: nome.value,
    email: email.value,
    cargo: cargo.value,
  })

  alert(`Usuário ${nome.value} (${cargo.value}) cadastrado!`)
  router.push({ name: 'Mesa' })
}
</script>

<style scoped>
/* Container Principal: Define o fundo e centraliza a caixa branca */
.cadastro-container {
  min-height: 100vh; /* Garante que ocupe a tela toda */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #ff7b00, #ff8c1a); /* O fundo fica AQUI agora */
  padding: 20px; /* Espaço para não colar nas bordas em telas pequenas */
}

.cadastro-box {
  background-color: #fff;
  width: 100%;
  max-width: 430px; /* Limita a largura para não ficar gigante */
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espaço entre os campos */
}

/* Agrupamento para alinhar label e input corretamente */
.input-group {
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  font-weight: 600;
}

input,
select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgb(228, 228, 228); /* Mesma cor cinza do login */
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
}

input:focus,
select:focus {
  border-color: #ff7b00;
  background-color: #fff;
}

/* Botão */
.btn-cadastrar {
  background-color: #ff7b00;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 10px;
  width: 100%;
}

.btn-cadastrar:hover {
  background-color: #e96b00;
}

/* Link de Voltar */
.voltar-login {
  display: block;
  text-align: center;
  font-size: 13px;
  color: #757575;
  text-decoration: none;
  margin-top: 20px;
  transition: color 0.2s;
}

.voltar-login:hover {
  text-decoration: underline;
  color: #ff7b00;
}
</style>
