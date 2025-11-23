<template>
  <div class="main-container">
    <div class="menu">
      <router-link to="/" class="menu-item" active-class="active">PRINCIPAL</router-link>
      <router-link to="/produtos" class="menu-item" active-class="active">PRODUTOS</router-link>
      <router-link to="/beneficios" class="menu-item" active-class="active">BENEFÍCIOS</router-link>
      <router-link to="/financeiro" class="menu-item" active-class="active">FINANCEIRO</router-link>
      <router-link to="/relatorios" class="menu-item" active-class="active">RELATÓRIOS</router-link>
      <router-link to="/configuracoes" class="menu-item" active-class="active"
        >CONFIGURAÇÕES</router-link
      >

      <div class="pesquisa" style="width: 250px">
        <img :src="imgBuscar" alt="iconebusca" />
        <input type="text" placeholder="Pesquisar" />
      </div>
    </div>

    <div class="main-content">
      <div class="left-column">
        <div class="icon-grid">
          <div class="icon-item">
            <img :src="imgPedidos" alt="Pedidos" />
            <span>Pedidos</span>
          </div>
          <div class="icon-item">
            <img :src="imgCardapio" alt="Cardápio" />
            <span>Cardápio</span>
          </div>
          <div class="icon-item">
            <img :src="imgProdutos" alt="Produtos" />
            <span>Produtos</span>
          </div>
        </div>

        <div class="form-section">
          <h1 class="form-title">Cadastrar produto</h1>

          <form class="form-cadastro" @submit.prevent="salvarProduto">
            <div class="linha">
              <input v-model="produto.nome" type="text" placeholder="Nome" class="input" />
              <input
                v-model.number="produto.valor"
                type="number"
                placeholder="Valor"
                class="input"
              />
            </div>

            <div class="linha">
              <select v-model="produto.tamanho" class="input">
                <option disabled value="">Tamanho</option>
              </select>
              <select v-model="produto.categoria" class="input">
                <option disabled value="">Categoria</option>
              </select>
            </div>

            <textarea
              v-model="produto.descricao"
              placeholder="Descrição"
              class="input descricao"
            ></textarea>

            <div class="upload">
              <label for="foto-produto" class="upload-box">
                <img src="https://img.icons8.com/ios/50/image.png" alt="foto" />
              </label>
              <div class="upload-text">
                <p><strong>Escolha a foto do produto</strong></p>
                <input type="file" id="foto-produto" @change="selecionarArquivo" />
                <div class="upload-actions">
                  <button type="button" class="btn-upload" @click="fazerUpload">Upload</button>
                  <span class="arquivo">{{ nomeArquivo }}</span>
                </div>
              </div>
            </div>

            <div class="botoes">
              <button type="button" class="btn cancelar" @click="cancelar">Cancelar</button>
              <button type="submit" class="btn salvar">Salvar</button>
            </div>
          </form>
        </div>
      </div>
      <div class="logo-container">
        <img :src="imgLogo" alt="logo" class="logo" />
      </div>
    </div>

    <footer>
      <div>Usuário: </div>
      <div>Registrado para: </div>
      <div>ResTapp versão 0.11</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import imgBuscar from '@/assets/imgbuscar.png'
import imgLogo from '@/assets/logo.png'
import imgPedidos from '@/assets/pedidos.png'
import imgCardapio from '@/assets/iconecardapio.png'
import imgProdutos from '@/assets/produtos.jpg'

const produto = ref({
  nome: '',
  valor: null,
  tamanho: '',
  categoria: '',
  descricao: '',
  foto: null,
})

const nomeArquivo = ref('Nenhum arquivo selecionado')

const selecionarArquivo = (event) => {
  const file = event.target.files[0]
  if (file) {
    produto.value.foto = file
    nomeArquivo.value = file.name
  }
}

const fazerUpload = () => {
  if (produto.value.foto) {
    alert(`Arquivo "${produto.value.foto.name}" pronto para upload!`)
  } else {
    alert('Nenhum arquivo selecionado.')
  }
}

const cancelar = () => {
  produto.value = {
    nome: '',
    valor: null,
    tamanho: '',
    categoria: '',
    descricao: '',
    foto: null,
  }
  nomeArquivo.value = 'Nenhum arquivo selecionado'
}

const salvarProduto = () => {
  console.log('Produto cadastrado:', produto.value)
  alert('Produto salvo com sucesso!')
  cancelar()
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
.main-container {
  margin: 0;
  font-family: 'Poppins', Arial, sans-serif;
  background: linear-gradient(to bottom, #ffffff 10%, #ff8c00 40%, #ff7a00 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.menu {
  background: #ffffffe8;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 25px;
  font-size: 14px;
  font-weight: bold;
  color: #8f8e8e;
}

.menu-item {
  padding: 6px 12px;
  border-radius: 15px;
  cursor: pointer;
  background-color: #f5f5f5;
  text-decoration: none;
  color: #8f8e8e;
  display: inline-block;
  transition: 0.3s;
}

.menu-item:hover {
  background: #8a8888;
  color: #f5f5f5;
}

.menu-item.active {
  background-color: #ff7b00;
  color: white;
}

.main-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1400px;
  margin: 40px auto 0;
  padding: 0 40px 40px 40px;
  width: 100%;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex-grow: 1;
  max-width: 900px;
}

.icon-grid {
  display: flex;
  gap: 30px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.icon-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.icon-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
  object-fit: contain;
}

.icon-item span {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.form-section {
  background: transparent;
}

.form-title {
  color: #fff;
  font-size: 2em;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-cadastro {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.linha {
  display: flex;
  gap: 20px;
}

.input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #fff;
  font-size: 14px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
}

.descricao {
  height: 100px;
  resize: none;
}

.upload {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
}

.upload-box {
  width: 80px;
  height: 80px;
  border: 2px dashed #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
}

.upload-box img {
  width: 35px;
  opacity: 0.6;
}

.upload-text p {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #fff;
}

.upload-text input[type='file'] {
  display: none;
}

.upload-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-upload {
  background: #fff;
  color: #ff8210;
  border: none;
  padding: 6px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.arquivo {
  font-size: 12px;
  color: #fff;
}

.botoes {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 10px;
}

.btn {
  width: 150px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.cancelar {
  background: #e0e0e0;
  color: #555;
}

.salvar {
  background: #000;
  color: white;
  background: linear-gradient(to right, #e65100, #ff6d00);
}

.logo-container {
  width: 180px;
  height: 180px;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pesquisa {
  display: flex;
  align-items: center;
  background: #bcbcbc;
  padding: 8px 15px;
  border-radius: 30px;
  width: 250px;
  margin-left: auto;
}
.pesquisa input {
  border: none;
  flex: 1;
  padding: 5px;
  font-size: 14px;
  outline: none;
  background-color: transparent;
  color: #fff;
}
.pesquisa img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  opacity: 0.7;
}

footer {
  margin-top: auto;
  padding: 15px 25px;
  font-size: 12px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
}
</style>
