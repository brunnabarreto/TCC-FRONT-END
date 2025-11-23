<template>
  <div class="main-container">

    <div class="menu">
      <router-link to="/" class="menu-item" active-class="active">
        PRINCIPAL
      </router-link>

      <router-link to="/produtos" class="menu-item" active-class="active">
        PRODUTOS
      </router-link>

      <router-link to="/beneficios" class="menu-item" active-class="active">
        BENEFÍCIOS
      </router-link>

      <router-link to="/financeiro" class="menu-item" active-class="active">
        FINANCEIRO
      </router-link>

      <router-link to="/relatorios" class="menu-item" active-class="active">
        RELATÓRIOS
      </router-link>

      <router-link to="/configuracoes" class="menu-item" active-class="active">
        CONFIGURAÇÕES
      </router-link>

      <div class="pesquisa" style="width:250px;">
        <img :src="imgBuscar" alt="iconebusca">
        <input type="text" placeholder="Pesquisar">
      </div>
    </div>

    <div class="main-content">
      <div class="icon-grid">

        <div class="icon-item">
           <img :src="imgAbrirFechar" alt="Abrir/Fechar">
           <span>Abrir / Fechar</span>
        </div>

        <div class="icon-item">
           <img :src="imgMesa" alt="Mesas">
           <span>Mesas</span>
        </div>

        <div class="icon-item">
           <img :src="imgDelivery" alt="Delivery">
           <span>Delivery</span>
        </div>

        <div class="icon-item">
           <img :src="imgCaixa" alt="Caixa/PDV">
           <span>Caixa / PDV</span>
        </div>

        <div class="icon-item">
           <img :src="imgFila" alt="Fila">
           <span>Fila</span>
        </div>

        <div class="icon-item">
           <img :src="imgAgendamento" alt="Agendados">
           <span>Agendados</span>
        </div>

        <div class="icon-item">
           <img :src="imgNfc" alt="NF-e">
           <span>NF-e</span>
        </div>

      </div>

      <div class="logo-container">
        <img :src="imgLogo" alt="logo" class="logo">
      </div>
    </div>

    <div class="actions">
      <div class="buscar-num">
        <input
          type="text"
          placeholder="Buscar número ou nome..."
          v-model="searchQuery"
        >
      </div>
      <div class="button">Juntar pedidos</div>
      <div style="flex:1;"></div>
      <div class="button">Atualizar</div>
      <div class="button">Iniciar pedido de Balcão</div>
    </div>

    <div class="grade-mesas">
      <div
        v-for="table in filteredTables"
        :key="table.id"
        class="mesa"
      >
        {{ table.status }}
        <div class="mesa-num">{{ table.number }}</div>
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
import { ref, computed } from 'vue';

import imgBuscar from '@/assets//imgbuscar.png';
import imgAbrirFechar from '@/assets/imgabrir-fechar.png';
import imgMesa from '@/assets/imgmesa.png';
import imgDelivery from '@/assets/imgdelivery.png';
import imgCaixa from '@/assets/imgcaixa.png';
import imgFila from '@/assets/imgfila.png';
import imgAgendamento from '@/assets/imgagendamento.png';
import imgNfc from '@/assets/imgnfc.png';
import imgLogo from '@/assets/logo.png';


const searchQuery = ref('');

const allTables = ref(
  Array.from({ length: 100 }, (_, index) => {
    const id = index + 1;
    return {
      id: id,
      number: String(id).padStart(2, '0'),
      status: 'Abrir',
    };
  })
);

const filteredTables = computed(() => {
  if (!searchQuery.value) {
    return allTables.value;
  }

  const query = searchQuery.value.toLowerCase();
  return allTables.value.filter(table => {
    return table.number.includes(query);
  });
});

</script>

<style scoped>
.main-container {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(to bottom, #ffffff 10%, #ff8c00 40%, #ff7a00 100%);
  min-height: 100vh;
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
  background-color: #F5F5F5;

  text-decoration: none;
  color: #8f8e8e;
  display: inline-block;
  transition: 0.3s;
}


.menu-item:hover {
  background: #8a8888;
  color: #F5F5F5;
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
    margin: 0 auto;
    padding: 20px 40px;
}

.icon-grid {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    flex-grow: 1;
}


.icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.icon-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}


.icon-item img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    object-fit: contain;
}


.icon-item span {
    font-size: 13px;
    font-weight: bold;
    color: #333;
    line-height: 1.2;
}


.logo-container {
    width: 160px;
    height: 160px;
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

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
}

.pesquisa {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 8px;
  border-radius: 30px;
  width: 250px;
  background-color: #BCBCBC;
}
.pesquisa input {
  border: none;
  flex: 1;
  padding: 5px 5px;
  font-size: 14px;
  outline: none;
  background-color: #BCBCBC;
  color: #e6e6e6;
}
.pesquisa img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  opacity: 0.7;
}

.buscar-num {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 8px;
  border-radius: 30px;
  width: 300px;
}

.buscar-num input {
  border: none;
  flex: 1;
  padding: 5px 10px;
  font-size: 14px;
  outline: none;
}

.button {
  background: #ffffff;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #cfcfcf;
  font-size: 13px;
  transition: 0.2s;
}

.button:hover {
  background: #eeeeee;
}

.grade-mesas {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
}

.mesa {
  background: #e6e6e6;
  border-radius: 6px;
  height: 80px;
  font-size: 14px;
  text-align: center;
  padding-top: 6px;
  cursor: pointer;
  transition: 0.2s;
  box-sizing: border-box;
}

.mesa:hover {
  background: #d3d3d3;
}

.mesa-num {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}

footer {
  background: transparent;
  padding: 15px 25px;
  font-size: 12px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
}
</style>
