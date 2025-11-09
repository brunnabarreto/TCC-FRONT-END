<template>
  <div class="login">
                  <h1>Login</h1>
             <p>Bem-vinda à tela inicial !</p>

    <!-- Links de navegação -->
    <router-link to="/cadastro">Cadastro</router-link> |
    <router-link to="/perfil">Perfil</router-link>
    <router-link to="/cadastro-produtos">Cadastro de Produtos</router-link>
    <router-link to="/financeiro">Financeiro</router-link>

  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #ff8210;
  font-size: 32px;
}

p {
  color: #999;
  font-size: 18px;
  margin-bottom: 20px;
}

router-link {
  margin: 0 10px;
  text-decoration: none;
  color: #ff8210;
  font-weight: bold;
}
</style>
