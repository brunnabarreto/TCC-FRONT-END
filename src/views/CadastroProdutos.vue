<template>
  <div class="main-container">
    <div class="menu">
      <router-link to="/mesa" class="menu-item" active-class="active">PRINCIPAL</router-link>
      <router-link to="/produtos" class="menu-item" active-class="active">PRODUTOS</router-link>
      <router-link to="/financeiro" class="menu-item" active-class="active">FINANCEIRO</router-link>
      <div class="menu-item em-desenvolvimento">
        RELATÓRIOS
        <span class="badge-dev-menu">Em desenvolvimento</span>
      </div>
      <div class="menu-item em-desenvolvimento">
        CONFIGURAÇÕES
        <span class="badge-dev-menu">Em desenvolvimento</span>
      </div>

      <div class="pesquisa" style="width: 250px">
        <img :src="imgBuscar" alt="iconebusca" />
        <input type="text" placeholder="Pesquisar" />
      </div>
    </div>

    <div class="main-content">
      <div class="left-column">
        <div class="icon-grid">
          <div class="icon-item" @click="abrirModalCadastro">
            <img :src="imgProdutos" alt="Produtos" />
            <span>Produtos</span>
          </div>
        </div>
      </div>
      <div class="logo-container">
        <img :src="imgLogo" alt="logo" class="logo" />
      </div>
    </div>

    <!-- Modal de Cadastro de Produtos -->
    <div v-if="mostrarModal" class="modal-overlay" @click="fecharModal">
      <div class="modal-window" @click.stop>
        <div class="modal-header">
          <h1 class="form-title">Cadastrar produto</h1>
          <button class="btn-fechar" @click="fecharModal">✕</button>
        </div>

        <div class="form-section">
          <form class="form-cadastro" @submit.prevent="salvarProduto">
            <div class="linha">
              <input v-model="produto.nome" type="text" placeholder="Nome" class="input" />
              <input
                v-model="produto.precoCusto"
                type="text"
                placeholder="0,00"
                class="input"
              />
            </div>

            <div class="linha">
              <input
                v-model="produto.precoVenda"
                type="texte"
                placeholder="0,00"
                class="input"
              />
            </div>

            <div class="linha">
              <!-- <select v-model="produto.tamanho" class="input">
                <option disabled value="">Tamanho</option>
              </select> -->
              <select v-model="produto.categoria" class="input">
                <option disabled value="">Categoria</option>

                <option
                  v-for="categoriaProdutos in categoriaProdutos"
                  :key="categoriaProdutos.id"
                  :value="categoriaProdutos.id"
                >
                  {{ categoriaProdutos.nomeCategoriaProdutos }}
                </option>
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
    </div>

    <footer>
      <div>Usuário: </div>
      <div>Registrado para: </div>
      <div>ResTapp versão 0.11</div>
    </footer>
  </div>
</template>

<script setup>
import imgBuscar from '@/assets/imgbuscar.png'
import imgLogo from '@/assets/logo.png'
import imgProdutos from '@/assets/produtos.jpg'
import api from '@/services/api'
import { onMounted, ref } from 'vue'

const mostrarModal = ref(false)

const abrirModalCadastro = () => {
  mostrarModal.value = true
}

const fecharModal = () => {
  mostrarModal.value = false
  cancelar()
}

const categoriaProdutos = ref([])
onMounted(async () => {
  try {
    const response = await api.get('/produtos/categoria-produtos')
    categoriaProdutos.value = response.data
  } catch (error) {
    console.error('Erro ao carregar categorias de produtos:', error)
  }
})

const produto = ref({
  nome: '',
  precoCusto: null,
  precoVenda: null,
  categoria: '',
  descricao: '',
  foto: null,
})

onMounted(async () => {
  try {
    const response = await api.get('/produtos/categoria-produtos')
    categoriaProdutos.value = response.data
  } catch (error) {
    console.error('Erro ao carregar categorias de produtos:', error)
  }
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
  fecharModal()
}

const salvarProduto = async () => {
  try {
    const payload = {
      nomeProduto: produto.value.nome,
      idCategoriaProdutos: produto.value.categoria,
      precoCusto: Number(produto.value.precoCusto?.toString().replace(',', '.') || 0),
      precoVenda: Number(produto.value.precoVenda?.toString().replace(',', '.') || 0),
      descricao: produto.value.descricao || ''
    }

    const response = await api.post("/produtos/produto", payload)
    console.log("SUCESSO:", response.data)
    alert('Produto salvo com sucesso!')
    fecharModal()

  } catch (error) {
    console.error('Erro ao salvar o produto:', error)
    alert('Erro ao salvar o produto. Tente novamente.')
  }
}
</script>


<style scoped>
:root {
  --primary-focus: #ff8c00;
  --border-color: #ccc;
  --bg-modal: #f4f4f4;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.main-container {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, sans-serif;
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

.menu-item.em-desenvolvimento {
  opacity: 0.6;
  cursor: not-allowed;
  position: relative;
}

.menu-item.em-desenvolvimento:hover {
  background: #F5F5F5;
  color: #8f8e8e;
}

.badge-dev-menu {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff3d3d;
  color: white;
  font-size: 7px;
  padding: 2px 4px;
  border-radius: 8px;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-window {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transform: scale(0.9);
  transform-origin: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 2px solid #f0f0f0;
}

.modal-header .form-title {
  margin: 0;
  font-size: 1.6em;
  color: #333;
  border-bottom: none;
  padding-bottom: 0;
}

.btn-fechar {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.btn-fechar:hover {
  color: #ff3d3d;
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
  transition: transform 0.2s, box-shadow 0.2s;
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
  background: white;
  border-radius: 0;
  padding: 30px;
  box-shadow: none;
  transform: none;
  transform-origin: initial;
}

.modal-window .form-title {
  color: #333;
  font-size: 1.8em;
  margin-bottom: 25px;
  font-weight: bold;
  border-bottom: 3px solid #ff8c00;
  padding-bottom: 10px;
}

.form-cadastro {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.linha {
  display: flex;
  gap: 15px;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: #fff;
  font-size: 13px;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, sans-serif;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #ff8c00;
  border-bottom: 2px solid #ff8c00;
}

.descricao {
  min-height: 80px;
  resize: vertical;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.upload {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.upload-box {
  width: 80px;
  height: 80px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.2s;
}

.upload-box:hover {
  border-color: #ff8c00;
  background-color: #fff8f0;
}

.upload-box img {
  width: 35px;
  opacity: 0.5;
}

.upload-text p {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #333;
  font-weight: 600;
}

.upload-text input[type='file'] {
  display: none;
}

.upload-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 8px;
}

.btn-upload {
  background: #ff8c00;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  transition: all 0.2s;
}

.btn-upload:hover {
  background: #e67e00;
}

.arquivo {
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.botoes {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.cancelar {
  background: #e0e0e0;
  color: #555;
}

.cancelar:hover {
  background: #d0d0d0;
}

.salvar {
  background: #ff8c00;
  color: white;
}

.salvar:hover {
  background: #e67e00;
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
