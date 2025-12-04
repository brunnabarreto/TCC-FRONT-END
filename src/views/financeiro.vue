<template>
  <div class="header-container">
    <nav class="top-nav">
  <div class="nav-links">

    <router-link to="/mesa" class="nav-item" active-class="active">
      PRINCIPAL
    </router-link>

    <router-link to="/produtos" class="nav-item" active-class="active">
      PRODUTOS
    </router-link>

    <router-link to="/beneficios" class="nav-item" active-class="active">
      BENEFÍCIOS
    </router-link>

    <router-link to="/financeiro" class="nav-item" active-class="active">
      FINANCEIRO
    </router-link>

    <router-link to="/relatorios" class="nav-item" active-class="active">
      RELATÓRIOS
    </router-link>

    <router-link to="/configuracoes" class="nav-item" active-class="active">
      CONFIGURAÇÕES
    </router-link>
  </div>

  <div class="search-bar">
    <input type="text" placeholder="Pesquisar">
  </div>
</nav>

    <div class="main-content">
      <div class="icon-grid">

        <div class="icon-item" @click="navegarPara('formas-pagamento')">
          <img :src="imgFormasPagamento" alt="Forma de Pagamento">
          <span>Formas de Pagamento</span>
        </div>

        <div class="icon-item" @click="navegarPara('categoria-contas')">
          <img :src="imgCategoriaContas" alt="Categoria de Contas">
          <span>Categoria de Contas</span>
        </div>

        <div class="icon-item" @click="navegarPara('fornecedores')">
          <img :src="imgFornecedores" alt="Fornecedores">
          <span>Fornecedores</span>
        </div>

        <div class="icon-item" @click="abrirModalContas">
          <img :src="imgContasPagar" alt="Contas a Pagar">
          <span>Contas a Pagar</span>
        </div>

        <div class="icon-item" @click="abrirModalReceber">
          <img :src="imgContasReceber" alt="Contas a Receber">
          <span>Contas a Receber</span>
        </div>

      </div>

      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
      </div>
    </div>

    <contas-apagar-financeiro v-if="mostrarModalContas" @close="mostrarModalContas = false"/>
    <contas-receber-financeiro v-if="mostrarModalReceber" @close="mostrarModalReceber = false"/>
  </div>

</template>

<script>
import imgFormas from '@/assets/formas de pagamento png.png.png';
import imgCategoria from '@/assets/categoria de contas.png.png';
import imgFornecedor from '@/assets/fornecedor.png.png';
import imgPagar from '@/assets/contas a pagar.png.png';
import imgReceber from '@/assets/contas a receber.png.png';
import imgLogo from '@/assets/logo.png';

import contasApagarFinanceiro from './ContasPagar.vue';
import ContasReceberFinanceiro from './contasReceberFinanceiro.vue';
export default {
  name: "TelaFinanceiro",
  components: {
    contasApagarFinanceiro,
    ContasReceberFinanceiro
  },


  data() {
    return {
      mostrarModalContas: false,
      mostrarModalReceber: false,
      imgFormasPagamento: imgFormas,
      imgCategoriaContas: imgCategoria,
      imgFornecedores: imgFornecedor,
      imgContasPagar: imgPagar,
      imgContasReceber: imgReceber,
      imgLogo: imgLogo
    };
  },

  methods: {
    navegarPara(rota) {
      this.$router.push({ name: rota });
    },
    abrirModalContas() {
      this.mostrarModalContas = true;
  },
    abrirModalReceber() {
      this.mostrarModalReceber = true;

    }
  }
};
</script>

<style scoped>
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
.header-container {
    --main-color: #fffffe8;
    --main-color-light: #ffe0b2;
    --text-color: #666;
    --nav-text: #fff;
    --active-bg: #fff;
    --inactive-bg: #f5f5f5;

    font-family: Arial, sans-serif;
     background: linear-gradient(to bottom, #ffffff 10%, #ff8c00 40%, #ff7a00 100%);
    min-height: 100vh;
}

.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 40px;
    background-color: var(--main-color);
}

.nav-links {
    display: flex;
    gap: 15px;
    align-items: center;
}

.nav-item {
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #f5f5f5;
  color: #8f8e8e;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  transition: 0.3s;
}

.nav-item:hover {
  background: #8a8888;
  color: #f5f5f5;
}

.nav-item.active {
    color: #f5f5f5;
    background-color: #ff7b00;
    background: linear-gradient(135deg, #ff8c00 0%, #ff7b00 100%);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.search-bar input {
    padding: 10px 15px;
    border: none;
    border-radius: 30px;
    background-color: #BCBCBC;
    font-size: 14px;
    width: 250px;
    outline: none;
    color: #666;

    background-image: url('@/assets/imgbuscar.png');

    background-size: 18px;

    background-repeat: no-repeat;

    background-position: 15px center;

    padding-left: 45px;
}

.search-bar input::placeholder {
    color: #999;
}

.main-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 40px 20px 40px;
    background-color: transparent;
}

.icon-grid {
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    flex-grow: 1;
}

.icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 140px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.icon-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.icon-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
    object-fit: contain;
}

.icon-item span {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    line-height: 1.3;
}

.logo-container {
    width: 160px;
    height: 160px;
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:transparent;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
}

.logo {
    width: 230%;
    height: 130%;
    object-fit: contain;
}
</style>
