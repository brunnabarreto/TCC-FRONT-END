<template>
  <div id="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style>
#app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-color: #ff8210;
  background-image: linear-gradient(
    to bottom,
    rgba(222, 211, 211, 0.733),
    #ff8210 20%
  );
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
}
</style>
