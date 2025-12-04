<template>
  <div class="main-container">

    <div class="menu">
      <router-link to="/" class="menu-item" active-class="active">
        PRINCIPAL
      </router-link>

      <router-link to="/produtos" class="menu-item" active-class="active">
        PRODUTOS
      </router-link>

      <router-link to="/financeiro" class="menu-item" active-class="active">
        FINANCEIRO
      </router-link>

      <div class="menu-item em-desenvolvimento">
        RELATÓRIOS
        <span class="badge-dev-menu">Em desenvolvimento</span>
      </div>

      <div class="menu-item em-desenvolvimento">
        CONFIGURAÇÕES
        <span class="badge-dev-menu">Em desenvolvimento</span>
      </div>

      <div class="pesquisa" style="width:250px;">
        <img :src="imgBuscar" alt="iconebusca">
        <input type="text" placeholder="Pesquisar">
      </div>
    </div>

    <div class="main-content">
      <div class="icon-grid">
        <div class="icon-item em-desenvolvimento">
            <img :src="imgAbrirFechar" alt="Abrir/Fechar">
            <span>Abrir / Fechar</span>
            <div class="badge-dev">Em desenvolvimento</div>
        </div>

        <div class="icon-item">
            <img :src="imgMesa" alt="Mesas">
            <span>Mesas</span>
        </div>

        <div class="icon-item em-desenvolvimento">
            <img :src="imgDelivery" alt="Delivery">
            <span>Delivery</span>
            <div class="badge-dev">Em desenvolvimento</div>
        </div>

        <div class="icon-item em-desenvolvimento">
            <img :src="imgCaixa" alt="Caixa/PDV">
            <span>Caixa / PDV</span>
            <div class="badge-dev">Em desenvolvimento</div>
        </div>

        <div class="icon-item em-desenvolvimento">
            <img :src="imgFila" alt="Fila">
            <span>Fila</span>
            <div class="badge-dev">Em desenvolvimento</div>
        </div>

        <div class="icon-item em-desenvolvimento">
            <img :src="imgAgendamento" alt="Agendados">
            <span>Agendados</span>
            <div class="badge-dev">Em desenvolvimento</div>
        </div>

        <div class="icon-item em-desenvolvimento">
            <img :src="imgNfc" alt="NF-e">
            <span>NF-e</span>
            <div class="badge-dev">Em desenvolvimento</div>
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
      <div class="button em-desenvolvimento">
        Juntar pedidos
        <span class="badge-dev-btn">Em desenvolvimento</span>
      </div>
      <div style="flex:1;"></div>
      <div class="button em-desenvolvimento">
        Atualizar
        <span class="badge-dev-btn">Em desenvolvimento</span>
      </div>
      <div class="button em-desenvolvimento">
        Iniciar pedido de Balcão
        <span class="badge-dev-btn">Em desenvolvimento</span>
      </div>
    </div>

    <div v-if="carregando" style="padding:20px; font-size:18px;">
      Carregando mesas...
    </div>

    <div v-if="erro" style="padding:20px; color:red;">
      {{ erro }}
    </div>

    <div class="mesas-ocupadas-box">
      <strong>Mesas ocupadas:</strong>

      <div class="mesas-ocupadas-lista">
        <div
          v-for="table in filteredTables"
          :key="table.id"
          :class="getMesaClasse(table.status)"
          class="mesa-item"
          @click="abrirMesa(table)"
          @mouseenter="mostrarPreview(table)"
          style="cursor:pointer; position: relative;"
        >
          <div class="mesa-item-numero">{{ table.number }}</div>
          <div class="mesa-item-status">{{ table.status }}</div>
          <div v-if="table.cliente" class="mesa-item-cliente">{{ table.cliente }}</div>
          <div v-if="table.valorTotalMesa != null && table.valorTotalMesa > 0" class="mesa-item-valor">
            R$ {{ Number(table.valorTotalMesa).toFixed(2) }}
          </div>

          <!-- Preview da TelaComanda ao passar o mouse -->
          <div v-if="previewMesa && previewMesa.id === table.id" class="mesa-preview" @click.stop>
            <div class="preview-header">
              <span class="preview-titulo">Mesa {{ table.number }}</span>
              <button class="btn-fechar-preview" @click="ocultarPreview">✕</button>
            </div>
            <div class="preview-content">
              <div v-if="table.pedidos && table.pedidos.length > 0" class="preview-pedidos">
                <strong>Pedidos:</strong>
                <div v-for="(pedido, idx) in table.pedidos.slice(0, 3)" :key="idx" class="preview-item">
                  {{ pedido.nomeProduto }} ({{ pedido.quantidade }}x)
                </div>
                <div v-if="table.pedidos.length > 3" class="preview-mais">+{{ table.pedidos.length - 3 }} mais</div>
              </div>
              <div v-if="table.pagamentos && table.pagamentos.length > 0" class="preview-pagamentos">
                <strong>Pagamentos:</strong>
                <div v-for="(pagamento, idx) in table.pagamentos.slice(0, 2)" :key="idx" class="preview-item">
                  R$ {{ Number(pagamento.valorPagamento).toFixed(2) }}
                </div>
              </div>
              <div v-if="table.valorTotalMesa" class="preview-total">
                Total: R$ {{ Number(table.valorTotalMesa).toFixed(2) }}
              </div>
              <div class="preview-actions">
                <button
                  @click="alternarStatusMesa(table)"
                  :class="['btn-bloquear', { 'bloqueado': table.status === 'FECHAMENTO' }]"
                >
                  {{ table.status === 'FECHAMENTO' ? '🔓 Cancelar Fechamento' : '💳 Solicitar Fechamento' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mesas-livres-box">
      <strong>Mesas disponíveis:</strong>

      <div class="mesas-livres-lista">
        <div
          v-for="n in mesasLivres"
          :key="n"
          class="mesa-livre-item"
          @click="criarSessaoMesa(n)"
          style="cursor:pointer;"
        >
          {{ String(n).padStart(2, '0') }}
        </div>
      </div>
    </div>

    <footer>
      <div>Usuário: </div>
      <div>Registrado para: </div>
      <div>ResTapp versão 0.11</div>
    </footer>

    <TelaComanda
      v-if="showComandaModal"
      :mesaId="selectedNumeroMesa"
      @close="showComandaModal = false"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import api from "@/services/api";
import mesaSessaoService from '@/services/mesaSessaoService';
import TelaComanda from './TelaComanda.vue';
import imgBuscar from '@/assets/imgbuscar.png';
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
const showComandaModal = ref(false);
const selectedNumeroMesa = ref(null); // Renomeado
const previewMesa = ref(null); // Estado para o preview

let intervalo = null;

// Buscar mesas no backend
async function buscarMesas() {
  carregando.value = true;
  erro.value = null;

  try {
    // Primeiro, busca a lista básica de mesas abertas
    const response = await api.get("/principal/mesas/abertas");

    // Para cada mesa, busca os detalhes completos
    const mesasDetalhadas = await Promise.all(
      response.data.map(async (m) => {
        try {
          // Busca os detalhes completos da mesa pelo número
          const detalhes = await api.get(`/principal/mesas/por-numero/${m.numeroMesa}`);

          return {
            id: detalhes.data.id,
            number: String(detalhes.data.numeroMesa).padStart(2, "0"),
            numeroMesa: detalhes.data.numeroMesa,
            cliente: detalhes.data.nomeCliente ?? null,
            status: detalhes.data.status ?? "ABERTA",
            quantidadePessoas: detalhes.data.quantidadePessoas,
            nomeAtendenteResponsavel: detalhes.data.nomeAtendenteResponsavel,
            atendenteAbertura: detalhes.data.atendenteAbertura,
            horarioAbertura: detalhes.data.horarioAbertura,
            horarioFechamento: detalhes.data.horarioFechamento,
            pedidos: detalhes.data.pedidos || [],
            pagamentos: detalhes.data.pagamentos || [],
            valorTotalMesa: detalhes.data.valorTotalMesa,
            taxaServico: detalhes.data.taxaServico,
            valorTotalMesaServico: detalhes.data.valorTotalMesaServico
          };
        } catch (e) {
          // Se falhar ao buscar detalhes, retorna dados básicos
          console.warn(`Erro ao buscar detalhes da mesa ${m.numeroMesa}:`, e);
          return {
            id: null,
            number: String(m.numeroMesa).padStart(2, "0"),
            numeroMesa: m.numeroMesa,
            cliente: m.nomeCliente ?? null,
            status: m.status ?? "ABERTA",
            quantidadePessoas: 0,
            nomeAtendenteResponsavel: null,
            atendenteAbertura: null,
            horarioAbertura: null,
            horarioFechamento: null,
            pedidos: [],
            pagamentos: [],
            valorTotalMesa: 0,
            taxaServico: 0,
            valorTotalMesaServico: 0
          };
        }
      })
    );

    mesas.value = mesasDetalhadas;
    console.log("Mesas carregadas com detalhes:", mesas.value);

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
  selectedNumeroMesa.value = table.numeroMesa || Number(table.number); // passa como número
  showComandaModal.value = true;
}

// Mostrar preview ao passar o mouse
function mostrarPreview(table) {
  previewMesa.value = table;
}

// Ocultar preview ao sair do mouse
function ocultarPreview() {
  previewMesa.value = null;
}

// Função para criar sessão ao clicar em mesa livre
async function criarSessaoMesa(numeroMesa) {
  try {
    carregando.value = true;
    erro.value = null;
    const mesaData = {
      numeroMesa: numeroMesa,
      quantidadePessoas: 1, // ou pedir ao usuário
      status: 'OCUPADA'
    };
    const resposta = await mesaSessaoService.criarMesa(mesaData);
    await buscarMesas();

    // Abrir a mesa criada automaticamente
    selectedNumeroMesa.value = numeroMesa;
    showComandaModal.value = true;
  } catch (e) {
    erro.value = e?.response?.data?.message || 'Erro ao criar sessão.';
  } finally {
    carregando.value = false;
  }
}

// Função para alternar status entre OCUPADA e FECHAMENTO
async function alternarStatusMesa(table) {
  try {
    carregando.value = true;
    const novoStatus = table.status === 'OCUPADA' ? 'FECHAMENTO' : 'OCUPADA';

    const mesaData = {
      numeroMesa: table.numeroMesa,
      quantidadePessoas: table.quantidadePessoas || 1,
      status: novoStatus,
      idAtendenteResponsavel: table.idAtendenteResponsavel || null,
      idCliente: table.idCliente || null,
      taxaServico: null
    };

    await mesaSessaoService.atualizarMesa(table.id, mesaData);
    await buscarMesas();

    // Oculta o preview após alternar
    previewMesa.value = null;
  } catch (e) {
    erro.value = e?.response?.data?.message || e?.response?.data || 'Erro ao alterar status da mesa.';
  } finally {
    carregando.value = false;
  }
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
    .map(m => m.numeroMesa || Number(m.number))
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
    position: relative;
}

.icon-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.icon-item.em-desenvolvimento {
    opacity: 0.6;
    cursor: not-allowed;
}

.icon-item.em-desenvolvimento:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.badge-dev {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff3d3d;
    color: white;
    font-size: 9px;
    padding: 3px 6px;
    border-radius: 10px;
    font-weight: bold;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
  position: relative;
}

.button:hover {
  background: #eeeeee;
}

.button.em-desenvolvimento {
  opacity: 0.6;
  cursor: not-allowed;
}

.button.em-desenvolvimento:hover {
  background: #ffffff;
}

.badge-dev-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff3d3d;
  color: white;
  font-size: 8px;
  padding: 2px 5px;
  border-radius: 8px;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.mesas-ocupadas-box {
  margin: 20px 40px;
  font-size: 18px;
}

.mesas-ocupadas-lista {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mesa-item {
  background: #e6e6e6;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  min-width: 100px;
  text-align: center;
  transition: 0.2s;
}

.mesa-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.mesa-preview {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  min-width: 200px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
  font-size: 12px;
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.preview-header {
  border-bottom: 2px solid #ff7b00;
  padding-bottom: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-fechar-preview {
  background: transparent;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: 0.2s;
}

.btn-fechar-preview:hover {
  background: #f0f0f0;
  color: #333;
}

.preview-titulo {
  font-weight: bold;
  color: #333;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-pedidos,
.preview-pagamentos {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-pedidos strong,
.preview-pagamentos strong {
  color: #ff7b00;
  font-size: 11px;
}

.preview-item {
  color: #333;
  font-size: 11px;
  padding-left: 8px;
  border-left: 2px solid #ffd08a;
}

.preview-mais {
  color: #888;
  font-size: 10px;
  font-style: italic;
  padding-left: 8px;
}

.preview-total {
  background: #ffd08a;
  padding: 6px;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.preview-actions {
  margin-top: 8px;
  display: flex;
  justify-content: center;
}

.btn-bloquear {
  background: #ff7b00;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-bloquear:hover {
  background: #ff6600;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.btn-bloquear.bloqueado {
  background: #4CAF50;
}

.btn-bloquear.bloqueado:hover {
  background: #45a049;
}

.mesa-item.mesa-ocupada {
  background: #ffd08a;
}

.mesa-item.mesa-fechamento {
  background: #ff9a9a;
}

.mesa-item.mesa-aberta {
  background: #b8ffb8;
}

.mesa-item-numero {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.mesa-item-status {
  font-size: 11px;
  color: #333;
  margin-bottom: 3px;
}

.mesa-item-cliente {
  font-size: 11px;
  color: #333;
  margin-bottom: 3px;
}

.mesa-item-valor {
  font-size: 12px;
  color: #006600;
  font-weight: bold;
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
  margin: 20px 40px;
  font-size: 18px;
}

.mesas-livres-lista {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mesa-livre-item {
  background: #e6e6e6;
  padding: 30px 30px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.mesa-livre-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: #d0d0d0;
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

/* Valor da mesa */
.mesa-valor {
  font-size: 12px;
  margin-top: 3px;
  color: #006600;
  font-weight: bold;
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
