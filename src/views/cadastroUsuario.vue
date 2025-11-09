<template>
  <div class="cadastro">
    <h1>Cadastro de Usuário</h1>
    <p>Preencha seus dados abaixo:</p>
    <input type="text" placeholder="Nome">
    <input type="email" placeholder="Email">
    <router-link to="/">Voltar para Home</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.cadastro { text-align: center; margin-top: 50px; }
h1 { color: #ff8210;}
input { display: block; margin: 10px auto; padding: 8px; }
</style>
