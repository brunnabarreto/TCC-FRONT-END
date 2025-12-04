<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">

      <div class="container">
        <div class="header">
          <span class="title">{{ mesaComandaTitulo }}</span>

          <div class="header-buttons">
            <button class="btn-saida" @click="$emit('close')">X</button>
          </div>
        </div>

        <div class="info-bar">
          <div class="pedido-numero">{{ mesa?.numeroMesa }}</div>

          <div class="pedido-info">
            <span class="pedido-id">{{ mesa?.nomeCliente ? `Cliente: ${mesa.nomeCliente}` : 'Sem cliente' }}</span>
            <span class="status" :class="mesa?.status?.toLowerCase()">{{ mesa?.status }}</span><br />
            <span class="inicio">Aberta em {{ formatarData(mesa?.horarioAbertura) }}</span>
          </div>

          <div class="area-busca">
            <input
              v-model="buscaProduto"
              @input="buscarProdutos"
              @focus="mostrarResultados = true"
              type="text"
              placeholder="Buscar produto pelo nome…"
            />
            <button class="btn-produtos em-desenvolvimento" @click="mostrarResultados = !mostrarResultados">
              <img
                src="https://img.icons8.com/ios/50/000000/ingredients.png"
              />
              Produtos
              <span class="badge-dev-btn">Em desenvolvimento</span>
            </button>

            <!-- Dropdown de resultados -->
            <div v-if="mostrarResultados && produtosEncontrados.length > 0" class="dropdown-produtos">
              <div
                v-for="produto in produtosEncontrados"
                :key="produto.id"
                class="produto-item"
                @click="selecionarProduto(produto)"
              >
                <div class="produto-info">
                  <strong>{{ produto.nomeProduto }}</strong>
                  <span class="produto-preco">R$ {{ Number(produto.precoVenda).toFixed(2) }}</span>
                </div>
                <div class="produto-categoria">{{ produto.nomeCateogria }}</div>
              </div>
            </div>

            <!-- Mensagem quando não encontrar produtos -->
            <div v-if="mostrarResultados && buscaProduto && produtosEncontrados.length === 0 && !buscandoProdutos" class="dropdown-produtos">
              <div class="produto-item-vazio">Nenhum produto encontrado</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="painel-lateral">
            <div class="criador">
              <label>Criado por: <strong>{{ mesa?.atendenteAbertura || 'Não especificado' }}</strong></label>
            </div>

            <div class="campo-info">
              <label>Responsável:</label>
              <p>{{ mesa?.nomeAtendenteResponsavel || 'Não especificado' }}</p>
            </div>

            <div class="campo-info">
              <label>Pessoas:</label>
              <p>{{ mesa?.quantidadePessoas || '0' }}</p>
            </div>

            <textarea
              v-model="observacao"
              class="textarea"
              placeholder="Anotar observação..."
            ></textarea>

            <div class="toggle-area">
              <label>Solicitar fechamento</label>
              <label class="switch">
                <input v-model="pedidoBloqueado" type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="menu-item em-desenvolvimento">
              <span class="icon">👤</span> Vincular Cliente
              <span class="badge-dev-menu">Em desenvolvimento</span>
            </div>

            <div class="menu-item em-desenvolvimento">
              <span class="icon">☰</span> Mais opções
              <span class="badge-dev-menu">Em desenvolvimento</span>
            </div>

            <div class="menu-item back">
              <a href="#" @click.prevent="$emit('close')">◀️ Voltar (Fechar)</a>
            </div>
          </div>

          <div class="items-area">

            <!-- Modal para adicionar quantidade ao produto selecionado -->
            <div v-if="produtoSelecionado" class="modal-quantidade">
              <div class="modal-quantidade-content">
                <h3>Adicionar ao Pedido</h3>
                <div class="produto-selecionado">
                  <strong>{{ produtoSelecionado.nomeProduto }}</strong>
                  <span>R$ {{ Number(produtoSelecionado.precoVenda).toFixed(2) }}</span>
                </div>

                <div class="form-group">
                  <label>Quantidade:</label>
                  <input
                    v-model.number="quantidadeSelecionada"
                    type="number"
                    min="1"
                    class="input-quantidade-modal"
                    @keyup.enter="confirmarPedido"
                  />
                </div>

                <div class="form-group">
                  <label>Observação (opcional):</label>
                  <input
                    v-model="observacaoPedido"
                    type="text"
                    placeholder="Ex: Sem cebola, mal passado..."
                    class="input-observacao-modal"
                    @keyup.enter="confirmarPedido"
                  />
                </div>

                <div class="modal-quantidade-buttons">
                  <button @click="cancelarSelecao" class="btn-cancelar">Cancelar</button>
                  <button
                    @click="confirmarPedido"
                    class="btn-confirmar"
                    :disabled="adicionandoPedido"
                  >
                    {{ adicionandoPedido ? 'Adicionando...' : 'Confirmar' }}
                  </button>
                </div>

                <p v-if="mensagemPedido" :class="['mensagem-feedback', mensagemPedido.tipo]">
                  {{ mensagemPedido.texto }}
                </p>
              </div>
            </div>

            <div class="conteudo-lancamentos">

              <!-- Enquanto carrega -->

            <p v-if="carregando">Carregando…</p>

            <p v-else-if="!mesa?.pedidos?.length" class="msg-lan-itens">
              Nenhum item lançado.
            </p>

            <!-- TABELA -->
            <table v-else class="tabela-pedidos">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qtd</th>
                  <th>V. Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="p in mesa.pedidos" :key="p.nomeProduto + p.quantidade">
                  <td>{{ p.nomeProduto }}</td>
                  <td>{{ p.quantidade }}</td>
                  <td>R$ {{ p.valorUnitario.toFixed(2) }}</td>
                  <td><strong>R$ {{ p.valorTotal.toFixed(2) }}</strong></td>
                </tr>
              </tbody>
            </table>

            </div>

          </div>
        </div>
        <div class="footer">
          <div class="resumo-valores">
            <div class="valor-item">
              <span>Subtotal:</span>
              <strong>R$ {{ (mesa?.valorTotalMesa || 0).toFixed(2) }}</strong>
            </div>
            <div class="valor-item">
              <span>Taxa serviço ({{ getTaxaPercentual() }}%):</span>
              <strong>R$ {{ (mesa?.taxaServico || 0).toFixed(2) }}</strong>
            </div>
            <div class="valor-item total">
              <span>Total:</span>
              <strong>R$ {{ (mesa?.valorTotalMesaServico || 0).toFixed(2) }}</strong>
            </div>
          </div>

          <button class="footer-btn em-desenvolvimento">🖨️ Imprimir
            <span class="badge-dev-footer">Em desenvolvimento</span>
          </button>

          <button class="footer-btn pagar em-desenvolvimento">💳 Pagamento
            <span class="badge-dev-footer">Em desenvolvimento</span>
          </button>
        </div>
      </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import api from '@/services/api'

defineEmits(['close'])

const props = defineProps({
  mesaId: {
    type: Number,
    required: true
  }
})

const mesa = ref(null)
const carregando = ref(true)
const observacao = ref('')
const pedidoBloqueado = ref(false)

// Estados para busca e seleção de produtos
const buscaProduto = ref('')
const produtosEncontrados = ref([])
const mostrarResultados = ref(false)
const buscandoProdutos = ref(false)
let timeoutBusca = null

// Estados para produto selecionado
const produtoSelecionado = ref(null)
const quantidadeSelecionada = ref(1)
const observacaoPedido = ref('')
const adicionandoPedido = ref(false)
const mensagemPedido = ref(null)

// Formata data para exibição
function formatarData(data) {
  if (!data) return 'Não informado'

  // O backend envia no formato "dd-MM-yyyy T HH:mm:ss"
  // Ex: "04-12-2025 T 14:30:00"
  try {
    // Remove espaços e o 'T' literal
    const cleanData = data.replace(/\s*T\s*/g, ' ').trim()

    // Divide em data e hora
    const [datePart, timePart] = cleanData.split(' ')
    const [dia, mes, ano] = datePart.split('-')
    const [hora, minuto, segundo] = timePart.split(':')

    // Cria objeto Date (mes - 1 porque Date usa 0-11 para meses)
    const date = new Date(ano, mes - 1, dia, hora, minuto, segundo)

    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      console.error('Data inválida:', data)
      return 'Data inválida'
    }

    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  } catch (err) {
    console.error('Erro ao formatar data:', data, err)
    return 'Formato de data inválido'
  }
}

// Calcula o percentual da taxa de serviço
function getTaxaPercentual() {
  if (!mesa.value?.valorTotalMesa || mesa.value.valorTotalMesa === 0) return 0
  const percentual = ((mesa.value.taxaServico / mesa.value.valorTotalMesa) * 100).toFixed(0)
  return percentual
}

// Recarrega os dados sempre que o número da mesa mudar
watch(() => props.mesaId, () => carregarMesa())

// Função para carregar os dados da mesa
async function carregarMesa() {
  carregando.value = true
  try {
    console.log("Buscando mesa por número:", props.mesaId)
    const response = await api.get(`/principal/mesas/por-numero/${props.mesaId}`)
    mesa.value = response.data
    console.log("Dados da mesa carregados:", mesa.value)
  } catch (err) {
    console.error("Erro ao buscar mesa:", err)
    mesa.value = null
  } finally {
    carregando.value = false
  }
}

// Função para buscar produtos por nome (com debounce)
function buscarProdutos() {
  // Limpa o timeout anterior
  if (timeoutBusca) {
    clearTimeout(timeoutBusca)
  }

  // Se a busca estiver vazia, limpa os resultados
  if (!buscaProduto.value.trim()) {
    produtosEncontrados.value = []
    return
  }

  console.log('Buscando produtos com termo:', buscaProduto.value)

  // Aguarda 500ms após o usuário parar de digitar
  timeoutBusca = setTimeout(async () => {
    buscandoProdutos.value = true
    try {
      console.log('Fazendo requisição para:', '/produtos/produto/buscar', 'com params:', { nomeProduto: buscaProduto.value })

      const response = await api.get('/produtos/produto/buscar', {
        params: { nomeProduto: buscaProduto.value }
      })

      produtosEncontrados.value = response.data
      console.log('Produtos encontrados:', response.data)

      mostrarResultados.value = true
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
      console.error('Detalhes do erro:', err.response?.data)
      produtosEncontrados.value = []
    } finally {
      buscandoProdutos.value = false
    }
  }, 500)
}

// Função quando usuário seleciona um produto
function selecionarProduto(produto) {
  produtoSelecionado.value = produto
  quantidadeSelecionada.value = 1
  observacaoPedido.value = ''
  mostrarResultados.value = false
  mensagemPedido.value = null
  console.log('Produto selecionado:', produto)
}

// Função para cancelar seleção
function cancelarSelecao() {
  produtoSelecionado.value = null
  quantidadeSelecionada.value = 1
  observacaoPedido.value = ''
  mensagemPedido.value = null
}

// Função para confirmar e adicionar o pedido
async function confirmarPedido() {
  if (!quantidadeSelecionada.value || quantidadeSelecionada.value < 1) {
    mensagemPedido.value = {
      tipo: 'erro',
      texto: 'Quantidade inválida.'
    }
    return
  }

  adicionandoPedido.value = true
  mensagemPedido.value = null

  try {
    const payload = {
      idProduto: produtoSelecionado.value.id,
      quantidadeProduto: quantidadeSelecionada.value,
      descricaoPedido: observacaoPedido.value || null
    }

    console.log('Enviando pedido:', payload, 'para mesa ID:', mesa.value.id)

    await api.post(`/principal/pedidos/mesa/${mesa.value.id}`, payload)

    // Sucesso
    mensagemPedido.value = {
      tipo: 'sucesso',
      texto: '✅ Pedido adicionado com sucesso!'
    }

    // Recarrega os dados da mesa
    await carregarMesa()

    // Aguarda um pouco e fecha o modal
    setTimeout(() => {
      cancelarSelecao()
      buscaProduto.value = ''
      produtosEncontrados.value = []
    }, 1500)

  } catch (err) {
    console.error('Erro ao adicionar pedido:', err)
    mensagemPedido.value = {
      tipo: 'erro',
      texto: err.response?.data?.message || 'Erro ao adicionar pedido.'
    }
  } finally {
    adicionandoPedido.value = false
  }
}

// Fecha dropdown ao clicar fora
function fecharDropdown(event) {
  const areaB = document.querySelector('.area-busca')
  if (areaB && !areaB.contains(event.target)) {
    mostrarResultados.value = false
  }
}

// Carrega os dados quando o componente monta
onMounted(() => {
  carregarMesa()
  document.addEventListener('click', fecharDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', fecharDropdown)
  if (timeoutBusca) clearTimeout(timeoutBusca)
})

// Computed para o título do modal
const mesaComandaTitulo = computed(() => `Mesa ${props.mesaId}`)
</script>


<style scoped>
/* 🟢 MODIFICAÇÃO 3: Adicionar o CSS do Modal Overlay para que ele flutue */

/* CSS do Overlay (fundo escuro transparente) */
.tabela-pedidos {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-top: 10px;
  font-size: 14px;
}

.tabela-pedidos th {
  text-align: left;
  background: #ececec;
  padding: 10px;
  border-bottom: 2px solid #ddd;
}

.tabela-pedidos td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.tabela-pedidos tr:hover {
  background: #f7f7f7;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Fundo escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* CSS da Janela do Modal */
.modal-window {
  background: transparent; /* A cor de fundo será o container interno */
  width: 900px; /* Largura base, mantida do container */
  max-width: 95%;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  /* Remove margem automática para centralizar no flexbox */
  margin: 0;
  transform: scale(0.85);
  transform-origin: center;
}

/* ---------------------------------------------------- */
/* CSS ORIGINAL DA TELACOMANDA (Ajustado) */
/* ---------------------------------------------------- */

/* Ajustado para se encaixar na modal-window */
.container {
  width: 100%; /* Ocupa 100% do modal-window */
  margin: 0; /* Remove a margem automática */
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.header {
  background: #ffb446;
  color: #fff;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons a {
  color: inherit;
  text-decoration: none;
  margin-right: 10px;
}

/* Ajustando o botão de saída para ser o 'X' */
.header-buttons button {
  width: 20px; /* Aumentado um pouco */
  height: 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: #e74c3c;
  color: white; /* Cor do X */
  font-weight: bold;
  font-size: 14px;
}

/* ... (Resto do CSS da TelaComanda inalterado) ... */
.info-bar {
  display: flex;
  align-items: center;
  padding: 18px;
  border-bottom: 1px solid #ddd;
}

.pedido-numero {
  font-size: 42px;
  font-weight: bold;
  margin-right: 18px;
}

.pedido-info {
  font-size: 14px;
}

.pedido-id {
  font-weight: bold;
  margin-right: 10px;
}

.status {
  background: #4caf50;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.status.aberta {
  background: #4caf50;
}

.status.fechada {
  background: #f44336;
}

.status.pausa {
  background: #ff9800;
}
.inicio {
  color: #666;
}

.area-busca {
  margin-left: auto;
  display: flex;
  align-items: center;
  position: relative;
}

.area-busca input {
  padding: 8px 12px;
  width: 250px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 10px;
  background-color: #fff;
  color: #333;
}

.area-busca input:focus {
  outline: none;
  border-color: #ffb446;
}

/* Dropdown de resultados da busca */
.dropdown-produtos {
  position: absolute;
  top: 100%;
  left: 0;
  width: 400px;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  z-index: 1000;
}

.produto-item {
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
}

.produto-item:hover {
  background: #f8f8f8;
}

.produto-item:last-child {
  border-bottom: none;
}

.produto-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.produto-preco {
  color: #4caf50;
  font-weight: bold;
}

.produto-categoria {
  font-size: 12px;
  color: #999;
}

.produto-item-vazio {
  padding: 15px;
  text-align: center;
  color: #999;
}

.btn-produtos {
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 15px;
  position: relative;
}

.btn-produtos.em-desenvolvimento {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-produtos img {
  width: 20px;
  margin-right: 6px;
}

.content {
  display: flex;
}

.painel-lateral {
  width: 250px;
  background: #f3f3f3;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.criador {
  margin-bottom: 10px;
  color: #444;
}

.input,
.textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
}

.textarea {
  height: 70px;
}

.toggle-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}
.switch input {
  display: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}
.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #4caf50;
}
input:checked + .slider:before {
  transform: translateX(20px);
}

.menu-item {
  margin-top: 14px;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
}

.menu-item.em-desenvolvimento {
  opacity: 0.6;
  cursor: not-allowed;
}

.menu-item.em-desenvolvimento:hover {
  background: #f3f3f3;
}

.menu-item:hover {
  background: #e0e0e0;
}

.menu-item.back {
  margin-top: 30px;
  font-weight: bold;
  color: #444;
}

.icon {
  margin-right: 6px;
}
.items-area {
  flex: 1;
  padding: 30px;
}

/* Modal para adicionar quantidade */
.modal-quantidade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-quantidade-content {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-quantidade-content h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.produto-selecionado {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.produto-selecionado strong {
  color: #333;
}

.produto-selecionado span {
  color: #4caf50;
  font-weight: bold;
}

.input-quantidade-modal,
.input-observacao-modal {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.input-quantidade-modal:focus,
.input-observacao-modal:focus {
  outline: none;
  border-color: #ffb446;
}

.modal-quantidade-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-cancelar,
.btn-confirmar {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-cancelar {
  background: #f44336;
  color: white;
}

.btn-cancelar:hover {
  background: #d32f2f;
}

.btn-confirmar {
  background: #4caf50;
  color: white;
}

.btn-confirmar:hover:not(:disabled) {
  background: #45a049;
}

.btn-confirmar:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.mensagem-feedback {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  font-size: 13px;
  text-align: center;
}

.mensagem-feedback.sucesso {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mensagem-feedback.erro {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.msg-lan-itens {
  color: #777;
}

.campo-info {
  margin-bottom: 15px;
}

.campo-info label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
  font-size: 12px;
}

.campo-info p {
  margin: 0;
  padding: 8px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.resumo-valores {
  display: flex;
  gap: 30px;
  margin-right: auto;
  align-items: center;
}

.valor-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;
}

.valor-item.total {
  border-top: 2px solid #ddd;
  padding-top: 8px;
  font-weight: bold;
  font-size: 15px;
}

.footer {
  background: #f6f6f6;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  gap: 20px;
}

.footer-btn {
  padding: 10px 20px;
  border: none;
  background: #d5e4ff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

.footer-btn.em-desenvolvimento {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer-btn.pagar {
  background: #d0ffd0;
}

.badge-dev-footer {
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

.badge-dev-menu {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff3d3d;
  color: white;
  font-size: 7px;
  padding: 2px 4px;
  border-radius: 6px;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

@media (max-width: 900px) {
  .modal-window {
    width: 95%;
    margin: 20px auto;
  }
  .container {
    margin: 0;
  }
  .info-bar {
    flex-wrap: wrap;
    gap: 15px;
  }

  .area-busca {
    margin-left: 0;
    width: 100%;
  }

  .content {
    flex-direction: column;
  }

  .painel-lateral {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .items-area {
    padding: 20px;
    width: 100%;
  }

  .footer {
    justify-content: center;
  }

  .dropdown-produtos {
    width: 90%;
  }

  .modal-quantidade-content {
    width: 90%;
  }
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .pedido-numero {
    font-size: 32px;
  }

  .area-busca input {
    width: 100%;
  }

  .info-bar {
    text-align: left;
  }

  .area-busca {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .area-busca input {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .dropdown-produtos {
    width: 100%;
  }

  .modal-quantidade-content {
    width: 95%;
    padding: 20px;
  }

  .footer {
    flex-direction: column;
    align-items: center;
  }

  .footer-btn {
    width: 90%;
  }
}
</style>
