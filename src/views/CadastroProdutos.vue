<template>
  <div>
    <header>
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo" />
      </div>
      <nav>
        <a href="#">Pedidos</a>
        <a href="#">Cardápio</a>
        <a href="#">Produtos</a>
      </nav>
    </header>

    <main>
      <h1><b>Cadastrar produto</b></h1>

      <form class="form-cadastro" @submit.prevent="salvarProduto">
        <div class="linha">
          <input
            v-model="produto.nome"
            type="text"
            placeholder="Nome"
            class="input"
          />
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
            <option>P</option>
            <option>M</option>
            <option>G</option>
          </select>
          <select v-model="produto.categoria" class="input">
            <option disabled value="">Categoria</option>
            <option>Bebida</option>
            <option>Comida</option>
            <option>Sobremesa</option>
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
            <button type="button" class="btn-upload" @click="fazerUpload">
              Upload
            </button>
            <span class="arquivo">{{ nomeArquivo }}</span>
          </div>
        </div>

        <div class="botoes">
          <button type="button" class="btn cancelar" @click="cancelar">
            Cancelar
          </button>
          <button type="submit" class="btn salvar">Salvar</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "CadastroProduto",
  data() {
    return {
      produto: {
        nome: "",
        valor: null,
        tamanho: "",
        categoria: "",
        descricao: "",
        foto: null,
      },
      nomeArquivo: "Nenhum arquivo selecionado",
    };
  },
  methods: {
    selecionarArquivo(event) {
      const file = event.target.files[0];
      if (file) {
        this.produto.foto = file;
        this.nomeArquivo = file.name;
      }
    },
    fazerUpload() {
      if (this.produto.foto) {
        alert(`Arquivo "${this.produto.foto.name}" pronto para upload!`);
      } else {
        alert("Nenhum arquivo selecionado.");
      }
    },
    cancelar() {
      this.produto = {
        nome: "",
        valor: null,
        tamanho: "",
        categoria: "",
        descricao: "",
        foto: null,
      };
      this.nomeArquivo = "Nenhum arquivo selecionado";
    },
    salvarProduto() {
      console.log("Produto cadastrado:", this.produto);
      alert("Produto salvo com sucesso!");
      this.cancelar();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  margin: 0;
  background: #fff;
  color: #333;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ff8210;
  padding: 10px 40px;
  color: white;
  border-bottom-width: 90px;
}

header .logo img {
  width: 100px;
  height: 70px;
}

nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: 600;
}

main {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  color: #ff8210;
  font-size: 2em;
  margin-bottom: 30px;
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
  padding: 10px;
  border: none;
  border-bottom: 3px solid #ff8210;
  background: #f4f4f4;
  border-radius: 4px;
}

.descricao {
  height: 100px;
  resize: none;
}

.upload {
  display: flex;
  align-items: center;
  gap: 20px;
}

.upload-box {
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
}

.upload-box img {
  width: 40px;
  opacity: 0.5;
}

.upload-text p {
  margin: 0;
  font-size: 14px;
}

.upload-text input[type="file"] {
  display: block;
  margin: 8px 0;
}

.btn-upload {
  background: #ff8210;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.arquivo {
  font-size: 12px;
  color: #999;
}

.botoes {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.btn {
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.cancelar {
  background: #ccc;
  color: white;
}

.salvar {
  background: #ff6b00;
  color: white;
}
</style>
