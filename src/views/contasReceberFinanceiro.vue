<template>
  <div class="modal-overlay" @click.self="$emit('close')">

    <div class="modal-window">

      <div class="modal-header">
        <h3>Conta a Receber</h3> <button class="btn-close" @click="$emit('close')">×</button>
      </div>

      <div class="modal-body">

        <fieldset class="group-box">

          <div class="row">
            <div class="col-grow">
              <label>Tipo:</label>
              <select v-model="form.tipo" class="custom-input">
                <option value="">Outras Receitas</option>
                <option value="venda">Venda de Mercadoria</option>
                <option value="servico">Prestação de Serviço</option>
              </select>
            </div>

            <div class="col-fixed">
              <label>Valor:</label>
              <input type="number" v-model="form.valor" placeholder="0,00" class="custom-input text-right">
            </div>
          </div>

          <div class="row">
            <div class="col-full">
              <label>Forma Pagamento:</label>
              <select v-model="form.formaPagamento" class="custom-input">
                <option value="">Selecione...</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label>Data do Pagamento:</label>
              <input type="datetime-local" v-model="form.dataPagamento" class="custom-input">
            </div>
            <div class="col">
              <label>Data do Crédito:</label>
              <input type="date" v-model="form.dataCredito" class="custom-input">
            </div>
          </div>

          <div class="row">
            <div class="col-half">
              <label>% Taxa:</label>
              <input type="number" v-model="form.taxa" placeholder="0,00" class="custom-input text-right">
            </div>
            <div class="col"></div>
          </div>

          <div class="row">
            <div class="col-full">
              <label>Observações:</label>
              <textarea v-model="form.observacoes" class="custom-input textarea-box"></textarea>
            </div>
          </div>

        </fieldset>

      </div>

      <div class="modal-footer">
        <button class="btn-text" @click="$emit('close')">
          <span>‹</span> Voltar
        </button>

        <div class="right-actions">
          <button class="btn-text orange-btn" @click="salvar">
            <span>✔</span> Salvar
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['close', 'save']);

const form = reactive({
  tipo: '',
  valor: null,
  formaPagamento: '',
  dataPagamento: '',
  dataCredito: '',
  taxa: null,
  observacoes: ''
});

const salvar = () => {
  console.log('Salvando Recebimento...', form);
  emit('save', form);
  emit('close');
};
</script>

<style scoped>
:root {
  --primary-focus: #ff8c00;
  --border-color: #ccc;
}

.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}

.modal-window {
  background: white;
  width: 650px;
  max-width: 95%;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 13px;
  display: flex; flex-direction: column;
}

.modal-header {
  background: #f0f0f0; padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  display: flex; justify-content: space-between; align-items: center;
}
.modal-header h3 { margin: 0; font-size: 14px; color: #333; }
.btn-close { background: none; border: none; font-size: 18px; cursor: pointer; }

.modal-body { padding: 15px; background: #f9f9f9; }

.group-box {
  border: 1px solid #ddd; border-radius: 4px; padding: 15px; background: white;
}

.row { display: flex; gap: 15px; margin-bottom: 12px; align-items: center; }
.col-grow { flex: 1; }
.col-fixed { width: 130px; }
.col-full { width: 100%; }
.col { flex: 1; }
.col-half { width: 48%; }

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
  width: 100%; padding: 7px;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  outline: none; transition: border-color 0.2s;
  background: #fff; font-family: inherit;
}

.custom-input:focus {
  border-color: #ff8c00;
  border-bottom: 2px solid #ff8c00;
}

.text-right { text-align: right; }
.textarea-box { resize: vertical; min-height: 70px; }

.modal-footer {
  padding: 10px 20px; background: #f0f0f0; border-top: 1px solid #ddd;
  display: flex; justify-content: space-between; align-items: center;
}

.btn-text {
  background: none; border: none; cursor: pointer; font-weight: bold;
  display: flex; align-items: center; gap: 5px; color: #333;
  padding: 8px 12px; border-radius: 4px; transition: all 0.2s ease;
}
.btn-text span { font-size: 16px; }
.btn-text:not(.orange-btn):hover { background-color: #e0e0e0; }

.btn-text.orange-btn {
  background-color: #ff8c00;
  color: white;
}
.btn-text.orange-btn span { color: white; }
.btn-text.orange-btn:hover { background-color: #e67e00; }
</style>
