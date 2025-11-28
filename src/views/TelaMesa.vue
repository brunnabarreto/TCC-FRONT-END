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

    <div v-if="carregando" style="padding:20px; font-size:18px;">
      Carregando mesas...
    </div>

    <div v-if="erro" style="padding:20px; color:red;">
      {{ erro }}
    </div>

    <!-- LISTA DE MESAS LIVRES (NOVO BLOCO) -->
    <div class="mesas-livres-box">
      <strong>Mesas disponíveis:</strong>

      <div class="mesas-livres-lista">
        <div
          v-for="n in mesasLivres"
          :key="n"
          class="mesa-livre-item"
        >
          {{ String(n).padStart(2, '0') }}
        </div>
      </div>
    </div>

    <!-- SUA GRADE ORIGINAL (SEM MEXER NO VISUAL) -->
    <div class="grade-mesas">
      <div
        v-for="table in filteredTables"
        :key="table.id"
        :class="getMesaClasse(table.status)"
        class="mesa"
        @click="abrirMesa(table)"
        style="position: relative;"
      >
        <div>{{ table.status }}</div>

        <!-- Badge de quantidade de pessoas-->
        <div v-if="table.pessoas > 0" class="badge">
          {{ table.pessoas }}
        </div>

        <!-- Número -->
        <div class="mesa-num">{{ table.number }}</div>

        <!-- Nome do cliente -->
        <div v-if="table.cliente" class="mesa-cliente">
          {{ table.cliente }}
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import api from "@/services/api";

import imgBuscar from '@/assets//imgbuscar.png';
import imgAbrirFechar from '@/assets/imgabrir-fechar.png';
import imgMesa from '@/assets/imgmesa.png';
import imgDelivery from '@/assets/imgdelivery.png';
import imgCaixa from '@/assets/imgcaixa.png';
import imgFila from '@/assets/imgfila.png';
import imgAgendamento from '@/assets/imgagendamento.png';
import imgNfc from '@/assets/imgnfc.png';
import imgLogo from '@/assets/logo.png';

const searchQuery = ref("");

const mesas = ref([]);
const carregando = ref(false);
const erro = ref(null);

let intervalo = null;

// Buscar mesas no backend
async function buscarMesas() {
  carregando.value = true;
  erro.value = null;

  try {
    const response = await api.get("/principal/mesas/abertas");

    mesas.value = response.data.map(m => ({
      number: String(m.numeroMesa).padStart(2, "0"),
      cliente: m.nomeCliente ?? null,
      status: m.status ?? "ABERTA"
    }));

  } catch (e) {
    erro.value = "Erro ao carregar mesas.";
    console.error(e);
  } finally {
    carregando.value = false;
  }
}

// Auto-refresh a cada 5 segundos
onMounted(() => {
  buscarMesas();
  intervalo = setInterval(buscarMesas, 5000);
});

onUnmounted(() => {
  clearInterval(intervalo);
});

// Clique da mesa
function abrirMesa(table) {
  console.log("Mesa clicada:", table);
}

// Filtragem
const filteredTables = computed(() => {
  if (!searchQuery.value) return mesas.value;

  const q = searchQuery.value.toLowerCase();
  return mesas.value.filter(t => t.number.includes(q));
});

// Cores automáticas
const getMesaClasse = (status) => {
  switch (status) {
    case "OCUPADA":
      return "mesa-ocupada";
    case "FECHAMENTO":
      return "mesa-fechamento";
    case "FECHADA":
      return "mesa-aberta";
    default:
      return "mesa";
  }
};

/////////////////////////////////////////////////////////////
// >>>>> BLOCO NOVO: CÁLCULO DE MESAS LIVRES <<<<<<
/////////////////////////////////////////////////////////////

// Lista fixa de 1 a 100
const todasMesas = Array.from({ length: 100 }, (_, i) => i + 1);

// Pega somente as mesas ocupadas e em fechamento
const mesasOcupadasOuFechamento = computed(() =>
  mesas.value
    .filter(m => m.status === 'OCUPADA' || m.status === 'FECHAMENTO')
    .map(m => Number(m.number))
);

// Mesas livres = todas que não estão ocupadas ou em fechamento
const mesasLivres = computed(() =>
  todasMesas.filter(n => !mesasOcupadasOuFechamento.value.includes(n))
);

</script>
<style scoped>
.main-container {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(to bottom, #ffffff 10%, #ff8c00 40%, #ff7a00 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: auto;
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
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
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
  white-space: nowrap;
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
  width: 200px;
  background-color: #BCBCBC;
  flex-shrink: 0;
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

.mesa-aberta {
  background: #b8ffb8;
}

.mesa-ocupada {
  background: #ffd08a;
}

.mesa-fechamento {
  background: #ff9a9a;
}

.mesas-livres-box {
  margin: 20px 0;
  font-size: 18px;
}

.mesas-livres-lista {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mesa-livre-item {
  background: #b8ffb8;
  padding: 6px 10px;
  border-radius: 5px;
  font-weight: bold;
}

/* Bolinha de quantidade de pessoas */
.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ff3d3d;
  color: white;
  font-size: 11px;
  padding: 3px 7px;
  border-radius: 50%;
}

/* Cliente */
.mesa-cliente {
  font-size: 11px;
  margin-top: 5px;
  color: #333;
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
