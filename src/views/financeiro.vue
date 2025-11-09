<template>
  <div class="pagina-financeiro">
    
    <nav class="nav-principal">
      <span>PRINCIPAL</span>
      <span>PRODUTOS</span>
      <span class="ativo">FINANCEIRO</span>
      <span>RELATÓRIOS</span>
      
      <span>CONFIGURAÇÕES</span>
    </nav>

    <div class="container-modulo">

      <nav class="nav-abas-financeiro">
        <button 
          :class="{ ativo: abaAtiva === 'formasPagamento' }" 
          @click="abaAtiva = 'formasPagamento'">
          Formas de Pagamento
        </button>
        <button 
          :class="{ ativo: abaAtiva === 'categorias' }" 
          @click="abaAtiva = 'categorias'">
          Categoria de Contas
        </button>
        <button 
          :class="{ ativo: abaAtiva === 'fornecedores' }" 
          @click="abaAtiva = 'fornecedores'">
          Fornecedores
        </button>
        <button 
          :class="{ ativo: abaAtiva === 'contasAPagar' }" 
          @click="abaAtiva = 'contasAPagar'">
          Contas a Pagar
        </button>
        <button 
          :class="{ ativo: abaAtiva === 'contasAReceber' }" 
          @click="abaAtiva = 'contasAReceber'">
          Contas a Receber
        </button>
        </nav>

      <div class="conteudo-aba">
        
        <div v-if="abaAtiva === 'contasAPagar'" class="layout-aba">
          <aside class="coluna-filtros">
            <h3>Pesquisar Contas a Pagar</h3>
            <button class="btn-novo" @click="abrirModal('novaDespesa')">+ Novo </button>
          </aside>
          
          <main class="coluna-dados">
            <div class="acoes-tabela">
              <button class="btn-editar" @click="abrirModal('editarDespesa', mockContasPagar[0])">Editar </button>
              <button class="btn-novo-alt" @click="abrirModal('novaDespesa')">+ Novo </button>
            </div>
            
            <table class="tabela-financeiro">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Data Lançamento</th>
                  <th>Vencimento</th>
                  <th>Categoria</th>
                  <th>Descrição / Fornecedor</th>
                  <th>Valor Previsto</th>
                  <th>Valor Pago</th>
                  <th>Data Pagamento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr @dblclick="abrirModal('editarDespesa', item)" v-for="item in mockContasPagar" :key="item.id">
                  <td><input type="checkbox" /></td>
                  <td>{{ item.dataLancamento }}</td>
                  <td>{{ item.vencimento }}</td>
                  <td>{{ item.categoria }}</td>
                  <td>{{ item.descricao }}</td>
                  <td>{{ item.valorPrevisto }}</td>
                  <td>{{ item.valorPago }}</td>
                  <td>{{ item.dataPagamento }}</td>
                  <td><span class="status-nao-pago">{{ item.status }}</span></td>
                </tr>
              </tbody>
            </table>
            <footer class="rodape-tabela">
              <span>Total:</span>
              <span class="total-valor">{{ totalContasPagar }}</span>
            </footer>
          </main>
        </div>

        <div v-if="abaAtiva === 'contasAReceber'" class="layout-aba">
          <aside class="coluna-filtros">
            <h3>Pesquisar Contas a Receber</h3>
            <button class="btn-novo" @click="abrirModal('novoRecebimento')">+ Novo</button>
          </aside>
          
          <main class="coluna-dados">
             <div class="acoes-tabela">
              <button class="btn-editar">Editar</button>
              <button class="btn-novo-alt" @click="abrirModal('novoRecebimento')">+ Novo </button>
            </div>
            
            <table class="tabela-financeiro">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Cód. Pedido</th>
                  <th>Valor Previsto</th>
                  <th>% Taxa</th>
                  <th>Valor Liq.</th>
                  <th>Forma Pagamento</th>
                  <th>Origem do Pedido</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in mockContasReceber" :key="item.id">
                  <td>{{ item.tipo }}</td>
                  <td>{{ item.cod }}</td>
                  <td>{{ item.valorPrevisto }}</td>
                  <td>{{ item.taxa }}</td>
                  <td>{{ item.valorLiq }}</td>
                  <td>{{ item.formaPgto }}</td>
                  <td>{{ item.origem }}</td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>

        <div v-if="abaAtiva === 'formasPagamento'">Formas de Pagamento (Conteúdo)</div>
        <div v-if="abaAtiva === 'categorias'">Categoria de Contas (Conteúdo)</div>
        <div v-if="abaAtiva === 'fornecedores'">Fornecedores (Conteúdo)</div>

      </div>

    </div> <div v-if="modalAtivo === 'novaDespesa'" class="modal-backdrop" @click.self="fecharModal">
      <div class="modal-container">
        <header class="modal-header">
          <h3>Nova Conta a Pagar</h3>
          <button class="btn-fechar" @click="fecharModal">X</button>
        </header>
        <div class="modal-body">
          <fieldset>
            <legend>Dados Principais</legend>
            <div class="form-grid">
              <div class="form-group span-2">
                <label>Categoria:</label>
                <select v-model="formNovaDespesa.categoria"><option>Aquisição de Insumos</option></select>
              </div>
              <button class="btn-inline-novo">+ Novo...</button>
              <div class="form-group span-1">
                <label>Vencimento:</label>
                <input type="date" v-model="formNovaDespesa.vencimento">
              </div>
              <div class="form-group span-2">
                <label>Fornecedor:</label>
                <select v-model="formNovaDespesa.fornecedor"><option>Top Alto Alimentos</option></select>
              </div>
              <button class="btn-inline-novo">+ Novo...</button>
              <div class="form-group span-1">
                <label>Valor:</label>
                <input type="text" v-model="formNovaDespesa.valor" placeholder="0,00">
              </div>
              <div class="form-group span-4">
                <label>Descrição:</label>
                <input type="text" v-model="formNovaDespesa.descricao" placeholder="Exemplo: Conta de água Jan/2018...">
              </div>
            </div>
          </fieldset>
        </div>
        <footer class="modal-footer">
          <button class="btn-link" @click="fecharModal">Voltar</button>
          <button class="btn-salvar">✔ Salvar e Voltar (F2)</button>
          <button class="btn-salvar">✔ Salvar e Novo (F3)</button>
        </footer>
      </div>
    </div>


    <div v-if="modalAtivo === 'editarDespesa'" class="modal-backdrop" @click.self="fecharModal">
      <div class="modal-container">
        <header class="modal-header">
          <h3>{{ formEditarDespesa.descricao || 'Editar Conta' }}</h3>
          <button class="btn-fechar" @click="fecharModal">X</button>
        </header>
        <div class="modal-body">
          <fieldset>
            <legend>Dados Principais</legend>
            <div class="form-grid">
              <div class="form-group span-2">
                <label>Categoria:</label>
                <select v-model="formEditarDespesa.categoria"><option>Aquisição de Insumos</option></select>
              </div>
              <button class="btn-inline-novo">+ Novo...</button>
              <div class="form-group span-1">
                <label>Vencimento:</label>
                <input type="date" :value="formatarDataParaInput(formEditarDespesa.vencimento)">
              </div>
              <div class="form-group span-2">
                <label>Fornecedor:</label>
                <select v-model="formEditarDespesa.fornecedor"><option>Top Alto Alimentos</option></select>
              </div>
              <button class="btn-inline-novo">+ Novo...</button>
              <div class="form-group span-1">
                <label>Valor:</label>
                <input type="text" v-model="formEditarDespesa.valorPrevisto">
              </div>
              <div class="form-group span-4">
                <label>Descrição:</label>
                <input type="text" v-model="formEditarDespesa.descricao">
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend><input type="checkbox" id="contaPagaEdit"> <label for="contaPagaEdit">Conta Paga</label></legend>
            <div class="form-grid-pagamento">
                <div class="form-group"><label>Pago em:</label><input type="text"></div>
                <div class="form-group"><label>(-) Descontos:</label><input type="text"></div>
                <div class="form-group"><label>(+) Juros/Multa:</label><input type="text"></div>
                <div class="form-group"><label>(=) Valor Pago:</label><input type="text"></div>
            </div>
          </fieldset>
        </div>
        <footer class="modal-footer">
          <button class="btn-link-danger">Excluir</button>
          <button class="btn-link">Duplicar</button>
          <div style="flex-grow: 1;"></div> <button class="btn-link" @click="fecharModal">Voltar</button>
          <button class="btn-salvar">✔ Salvar e Voltar</button>
          <button class="btn-salvar">✔ Salvar e Novo </button>
        </footer>
      </div>
    </div>


    <div v-if="modalAtivo === 'novoRecebimento'" class="modal-backdrop" @click.self="fecharModal">
      <div class="modal-container" style="max-width: 600px;">
        <header class="modal-header">
          <h3>Conta a Receber</h3>
          <button class="btn-fechar" @click="fecharModal">X</button>
        </header>
        <div class="modal-body">
          <div class="form-grid-recebimento">
              <div class="form-group">
                <label>Tipo:</label>
                <select><option>Outras Receitas</option></select>
              </div>
              <div class="form-group">
                <label>Valor:</label>
                <input type="text" placeholder="0,00">
              </div>
              <div class="form-group">
                <label>Forma Pagamento:</label>
                <select><option></option></select>
              </div>
              <div class="form-group">
                <label>Data do Crédito:</label>
                <input type="date">
              </div>
              <div class="form-group">
                <label>Data do Pagamento:</label>
                <input type="text" value="10/10/2025 21:04" disabled>
              </div>
              <div class="form-group"></div>
              <div class="form-group">
                <label>% Taxa:</label>
                <input type="text" value="0,00">
              </div>
              <div class="form-group"></div>
              <div class="form-group span-full">
                <label>Observações:</label>
                <textarea rows="4"></textarea>
              </div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn-link" @click="fecharModal">Voltar</button>
          <button class="btn-salvar">✔ Salvar</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// --- Estado das Abas ---
const abaAtiva = ref('contasAPagar'); // Define 'Contas a Pagar' como a aba inicial

// --- Estado dos Modais ---
const modalAtivo = ref(null); // 'novaDespesa', 'editarDespesa', 'novoRecebimento'
const itemSelecionado = ref(null);

// --- Formulários ---
const formNovaDespesa = reactive({
  categoria: 'Aquisição de Insumos',
  vencimento: new Date().toISOString().split('T')[0],
  fornecedor: 'Top Alto Alimentos',
  valor: '',
  descricao: ''
});

const formEditarDespesa = reactive({});

const formNovoRecebimento = reactive({});

// --- Funções dos Modais ---
const abrirModal = (nomeModal, item = null) => {
  if (item) {
    Object.assign(formEditarDespesa, item);
  }
  modalAtivo.value = nomeModal;
};

const fecharModal = () => {
  modalAtivo.value = null;
  Object.keys(formEditarDespesa).forEach(key => delete formEditarDespesa[key]);
};

// --- Dados Mock (Exemplo) ---
const mockContasPagar = ref([
  {
    id: 1,
    dataLancamento: '26/09/2025',
    vencimento: '10/10/2025',
    categoria: 'Aquisição de Insumos',
    descricao: '23791.58005 90000.176348... / Top Alto Alimentos',
    valorPrevisto: '437,57',
    valorPago: '',
    dataPagamento: '',
    status: 'Não Pago'
  }
]);

const mockContasReceber = ref([
  { id: 1, tipo: 'Recebimento - Ve...', cod: '16262', valorPrevisto: '0,01', taxa: '0,00', valorLiq: '0,01', formaPgto: 'Consumo Guia Turi...', origem: 'Comanda Mobile', status: 'Pago e Credit...' },
  { id: 2, tipo: 'Recebimento - Ve...', cod: '16288', valorPrevisto: '0,06', taxa: '0,00', valorLiq: '0,06', formaPgto: 'Permuta', origem: 'Comanda Mobile', status: 'Pago e Credit...' },
  { id: 3, tipo: 'Recebimento - Ve...', cod: '16296', valorPrevisto: '30,00', taxa: '0,49', valorLiq: '29,85', formaPgto: 'Pix Manual', origem: 'Desktop', status: 'Pago e Credit...' },
]);

// --- Cálculos ---
const totalContasPagar = computed(() => {
  const total = mockContasPagar.value.reduce((acc, item) => {
    return acc + parseFloat(item.valorPrevisto.replace(',', '.'));
  }, 0);
  return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

// --- Utilitários ---
const formatarDataParaInput = (dataStr) => {
  if (!dataStr) return '';
  const [dia, mes, ano] = dataStr.split('/');
  return `${ano}-${mes}-${dia}`;
};

</script>

<style scoped>
/* Estilos Globais do Componente */
:root {
  --cor-principal: #ff8210;
  --cor-texto-principal: #ffffff;
  --cor-fundo-app: #d44017;
  --cor-fundo-conteudo:#ffffff;
  --cor-borda: #F5F2F0;
  --cor-texto-padrao: #333;
  --cor-texto-label: #555;
  --cor-link: #ff8210;
  --cor-danger: #dc3545;
}

.pagina-financeiro {
  font-family: Arial, sans-serif;
  /* NOVO: Fundo da página Laranja */
  background-color: var(--cor-principal);
  min-height: 100vh;
  color: var(--cor-texto-padrao);
  /* NOVO: Espaçamento para as caixas brancas "flutuarem" */
  padding: 20px;
  box-sizing: border-box;
}

/* 1. Navegação Principal (Branca, como na Home) */
.nav-principal {
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem a linha se necessário */
  /* NOVO: Fundo branco e cantos arredondados */
  background-color: var(--cor-fundo-conteudo);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  /* NOVO: Espaçamento interno e margem inferior */
  padding: 5px 10px;
  margin-bottom: 20px;
}
.nav-principal span {
  /* NOVO: Texto escuro */
  color: var(--cor-texto-label);
  padding: 10px 15px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 5px;
}
.nav-principal span.ativo {
  /* NOVO: Fundo cinza claro para o item ativo, como no print da Home */
  background-color: #e0e0e0;
  color: var(--cor-texto-padrao);
}

/* 2. NOVO: Container do Módulo (Caixa Branca) */
.container-modulo {
  background-color: var(--cor-fundo-conteudo);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  overflow: hidden; /* Garante que os cantos arredondados funcionem */
}

/* 2.1 Navegação das Abas (Dentro da caixa branca) */
.nav-abas-financeiro {
  display: flex;
  flex-wrap: wrap;
  /* NOVO: Fundo cinza claro, grudado no topo da caixa branca */
  background-color: #f9f9f9;
  border-bottom: 1px solid var(--cor-borda);
  padding: 0 20px;
}
.nav-abas-financeiro button {
  /* NOVO: Texto escuro */
  background: none;
  border: none;
  color: var(--cor-texto-label);
  padding: 12px 18px;
  font-size: 0.85rem;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.nav-abas-financeiro button:hover {
  color: var(--cor-texto-padrao);
}
.nav-abas-financeiro button.ativo {
  /* NOVO: Fica transparente (mostrando o fundo #f9f9f9) */
  background-color: transparent;
  /* NOVO: Texto laranja */
  color: var(--cor-principal);
  border-bottom: 3px solid var(--cor-principal);
  font-weight: bold;
}

/* 2.2 Conteúdo da Aba (Dentro da caixa branca) */
.conteudo-aba {
  /* (Estilos de margem, sombra e borda removidos pois agora estão no .container-modulo) */
  padding: 20px;
}

/* O restante dos estilos (.layout-aba, .coluna-filtros, .tabela-financeiro, etc.) 
  continua o mesmo, pois controla o layout *dentro* da aba.
*/

.layout-aba {
  display: flex;
  gap: 20px;
}
.coluna-filtros {
  flex: 0 0 250px;
  border-right: 1px solid var(--cor-borda);
  padding-right: 20px;
}
.coluna-dados {
  flex: 1;
  overflow-x: auto;
}

/* 3.1 Estilos da Tabela */
.acoes-tabela {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
.tabela-financeiro {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}
.tabela-financeiro th,
.tabela-financeiro td {
  border: 1px solid var(--cor-borda);
  padding: 8px 10px;
  text-align: left;
  white-space: nowrap;
}
.tabela-financeiro th {
  background-color: #f4f4f4;
}
.tabela-financeiro tbody tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
.status-nao-pago {
  color: var(--cor-danger);
  font-weight: bold;
}
.rodape-tabela {
  margin-top: 15px;
  text-align: right;
  font-weight: bold;
  font-size: 1.1rem;
}
.rodape-tabela .total-valor {
  margin-left: 20px;
  color: #000;
}



.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  background-color: rgba(0, 0, 0, 0.6); 
  
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  z-index: 1000;
  padding: 40px 0;
}
.modal-container {
  background-color: var(--cor-fundo-conteudo); /* (Isso usa sua variável de cor branca) */
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--cor-borda);
}
.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
}
.btn-fechar {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
}
.modal-body {
  padding: 24px;
  overflow-y: auto;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid var(--cor-borda);
  background-color: #f9f9f9;
  border-radius: 0 0 8px 8px;
}

/* 5. Estilos de Formulário (Nenhuma mudança necessária) */
fieldset {
  border: 1px solid var(--cor-borda);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
}
fieldset legend {
  font-weight: bold;
  padding: 0 10px;
  font-size: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.form-group label {
  font-size: 0.85rem;
  color: var(--cor-texto-label);
  margin-bottom: 4px;
}
.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--cor-borda);
  border-radius: 4px;
  font-size: 0.9rem;
  box-sizing: border-box; 
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  align-items: flex-end;
}
.form-grid .span-2 { grid-column: span 2; }
.form-grid .span-4 { grid-column: span 4; }

.form-grid-pagamento {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}
.form-grid-recebimento {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 20px;
}
.form-grid-recebimento .span-full {
  grid-column: 1 / -1;
}

/* 6. Estilos de Botões (Nenhuma mudança necessária) */
.btn-novo, .btn-novo-alt {
  background-color: #F5F2F0;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn-editar {
  background-color: #F5F2F0;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn-salvar {
  background-color: #F5F2F0;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn-inline-novo {
  background-color: #e9ecef;
  border: 1px solid #ccc;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  height: 38px;
}
.btn-link {
  background: none;
  border: none;
  color: var(--cor-link);
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
}
.btn-link-danger {
  background: none;
  border: none;
  color: var(--cor-danger);
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
  margin-right: auto;
}
</style>