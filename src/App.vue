<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
body, html {
  /* =======================================
    ==   AQUI ESTÁ O SEU NOVO FUNDO       ==
    =======================================
  */
  
  /* 1. Cor de fallback (caso o gradiente falhe) */
  background-color: #ff8210; 
  
  /* 2. O Gradiente (o "branquinho em cima") 
     Lê-se: "Comece de cima (to bottom) com um branco 
     levemente transparente, e faça a transição 
     para o laranja principal"
  */
  background-image: linear-gradient(
    to bottom, 
    rgba(222, 211, 211, 0.733), /* "Branquinho" leve e transparente no topo */
    #ff8210 20%                  /* Seu laranja (começando a 20% do topo) */
  );

  /* Garante que o gradiente cubra a tela toda e não repita */
  background-repeat: no-repeat;
  
  /* Coisas importantes que já estavam */
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>