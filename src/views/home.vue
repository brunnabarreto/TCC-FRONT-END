<template>
  <div class="home">
    <h1>Home</h1>
    <p>Bem-vinda à tela inicial do seu projeto!</p>

    <!-- Links de navegação -->
    <router-link to="/cadastro">Cadastro</router-link> |
    <router-link to="/perfil">Perfil</router-link>
   
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
  color: #f67280;
  font-size: 32px;
}

p {
  color: #355c7d;
  font-size: 18px;
  margin-bottom: 20px;
}

router-link {
  margin: 0 10px;
  text-decoration: none;
  color: #6c5b7b;
  font-weight: bold;
}
</style>
