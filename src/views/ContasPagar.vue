<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-header">
        <h3>Nova Conta a Pagar</h3>
        <button class="btn-close" @click="$emit('close')">×</button>
      </div>

      <div class="modal-body">
        <fieldset class="group-box">
          <legend>Dados Principais</legend>

          <div class="row">
            <div class="col-grow">
              <label>Categoria:</label>
              <div class="input-group">
                <select v-model="form.categoria" class="custom-input">
                  <option disabled value="">Selecione...</option>

                  <option
                    v-for="c in categorias"
                    :key="c.id"
                    :value="c.id"
                  >
                    {{ c.nomeCategoria }}
                  </option>
                </select>
                <!-- <button class="btn-plus">+ Novo</button> -->
              </div>
            </div>

            <div class="col-fixed">
              <label>Vencimento:</label>
              <input type="date" v-model="form.vencimento" class="custom-input" />
            </div>
          </div>

          <div class="row">
            <div class="col-grow">
              <label>Fornecedor:</label>
              <div class="input-group">
                <select v-model="form.fornecedor" class="custom-input">
                  <option disabled value="">Selecione...</option>

                  <option
                    v-for="fornecedores in fornecedores"
                    :key="fornecedores.id"
                    :value="fornecedores.id"
                  >
                    {{ fornecedores.nomeFantasia }}
                  </option>
                </select>
                <!-- <button class="btn-plus">+ Novo</button> -->
              </div>
            </div>

            <div class="col-fixed">
              <label>Valor:</label>
              <input type="number" v-model="form.valor" placeholder="0,00" class="custom-input" />
            </div>
          </div>

          <div class="row">
            <div class="col-full">
              <label>Descrição:</label>
              <input
                type="text"
                v-model="form.descricao"
                placeholder="Ex:Descrição da conta..."
                class="custom-input"
              />
            </div>
          </div>

          <div class="row-check">
            <input type="checkbox" id="manter" v-model="form.manterCampos" />
            <label for="manter">Manter os campos Categoria e Fornecedor ao salvar</label>
          </div>
        </fieldset>

        <!-- <div class="simple-box">
          <strong>Repetir esta conta:</strong>
          <label>Num. Repetições:</label>
          <input type="number" v-model="form.repeticoes" class="custom-input small-input" min="1" />

          <label>Frequência:</label>
          <select v-model="form.frequencia" class="custom-input">
            <option value="mensal">Mensal</option>
            <option value="semanal">Semanal</option>
          </select>

          <button class="btn-action outline">Criar Repetições</button>
        </div> -->

        <fieldset class="group-box" :class="{ disabled: !form.isPago }">
          <legend>
            <input type="checkbox" v-model="form.isPago" id="chkPago" />
            <label for="chkPago">Conta Paga</label>
          </legend>

          <div class="row" v-if="form.isPago">
            <div class="col">
              <label>Pago em:</label>
              <input type="date" v-model="form.dataPagamento" class="custom-input" />
            </div>
            <div class="col">
              <label>(-) Descontos:</label>
              <input type="number" v-model="form.desconto" class="custom-input" />
            </div>
            <div class="col">
              <label>(+) Juros/Multa:</label>
              <input type="number" v-model="form.juros" class="custom-input" />
            </div>
            <div class="col">
              <label>Valor Pago:</label>
              <input
                type="number"
                :value="calculaTotalPago"
                disabled
                class="custom-input bg-gray"
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div class="modal-footer">
        <button class="btn-text" @click="$emit('close')"><span>‹</span> Voltar</button>

        <div class="right-actions">
          <button class="btn-text orange-btn" @click="salvar">
            <span>✔</span> Salvar e Voltar
          </button>
          <button class="btn-text orange-btn" @click="salvarNovo">
            <span>✔</span> Salvar e Novo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import api from '@/services/api'

// const emit = defineEmits(['close', 'save'])

const categorias = ref([])
const fornecedores = ref([])

const form = reactive({
  categoria: '',
  fornecedor: '',
  vencimento: '',
  valor: null,
  descricao: '',
  manterCampos: false,
  repeticoes: 1,
  frequencia: 'mensal',
  isPago: false,
  dataPagamento: '',
  desconto: 0,
  juros: 0,
})

onMounted(async () => {
  await carregarCategorias()
  await carregarFornecedores()
})

const carregarCategorias = async () => {
  try {
    const { data } = await api.get('/financeiro/categoria-contas')
    categorias.value = data
  } catch (err) {
    console.error("Erro ao carregar categorias:", err)
  }
}

const carregarFornecedores = async () => {
  try {
    const { data } = await api.get('/financeiro/fornecedor')
    fornecedores.value = data
  } catch (err) {
    console.error("Erro ao carregar fornecedores:", err)
  }
}

const calculaTotalPago = computed(() => {
  const val = parseFloat(form.valor || 0)
  const desc = parseFloat(form.desconto || 0)
  const jur = parseFloat(form.juros || 0)
  return (val - desc + jur).toFixed(2)
})

const salvar = async () => {
  try {
    const payload = {
      categoriaId: form.categoria,
      fornecedorId: form.fornecedor,
      dataVencimento: form.vencimento,
      valor: form.valor,
      descricao: form.descricao,
      // isPago: form.isPago,
      dataPagamento: form.dataPagamento,
      // desconto: form.desconto,
      // juros: form.juros
    }

    const response = await api.post("/financeiro/contas-pagar", payload)

    console.log("SUCESSO:", response.data)

    return true

  } catch (error) {
    console.error("Erro ao salvar:", error.response?.data || error)
    alert("Erro ao salvar a conta! Veja o console.")
    return false
  }
}

const salvarNovo = () => {
  console.log('Salvando e limpando...', form)
}
</script>

<style scoped>
:root {
  --primary-focus: #ff8c00;
  --border-color: #ccc;
  --bg-modal: #f4f4f4;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-window {
  background: white;
  width: 750px;
  max-width: 95%;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
}

.modal-header {
  background: #f0f0f0;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-body {
  padding: 15px;
  background: #f9f9f9;
}

.group-box {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background: white;
}

.group-box legend {
  font-weight: bold;
  padding: 0 5px;
  color: #555;
}

.group-box.disabled {
  background: #eee;
  color: #999;
}

.row {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  align-items: center;
}

.col-grow {
  flex: 1;
}

.col-fixed {
  width: 140px;
}

.col-full {
  width: 100%;
}

.col {
  flex: 1;
}

input[type="checkbox"] {
  accent-color: #ff8c00;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

label {
  display: block;
  margin-bottom: 4px;
  color: #555;
  font-weight: 700;
  font-size: 12px;
  transition: all 0.2s ease;

  border-left: 3px solid transparent;
  padding-left: 0px;
}

label:hover {
  color: #ff8c00;
  border-left: 3px solid #ff8c00;
  padding-left: 8px;
  cursor: pointer;
}

.custom-input {
  width: 100%;
  padding: 6px;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  outline: none;
  transition: border-color 0.2s;
  background: #fff;
}

.custom-input:focus {
  border-color: #ff8c00;
  border-bottom: 2px solid #ff8c00;
}

.input-group {
  display: flex;
  gap: 5px;
}

.btn-plus {
  border: none;
  background: transparent;
  color: #ff8c00;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
}

.simple-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
}

.small-input {
  width: 60px;
}

.modal-footer {
  padding: 10px 20px;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right-actions {
  display: flex;
  gap: 10px;
}

.btn-text {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-text span {
  font-size: 16px;
}

.btn-text.orange-btn {
  background-color: #ff8c00;
  color: white;
}

.btn-text.orange-btn span {
  color: white;
}

.btn-text.orange-btn:hover {
  background-color: #e67e00;
}

.btn-text:not(.orange-btn):hover {
  background-color: #e0e0e0;
}

.row-check {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
}

.bg-gray {
  background: #eee;
}
</style>
