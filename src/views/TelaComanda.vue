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
          <div class="pedido-numero">01</div>

          <div class="pedido-info">
            <span class="pedido-id">Pedido #001</span>
            <span class="status">EM ABERTO</span><br />
            <span class="inicio">Iniciado em 01-07 às 14:11</span>
          </div>

          <div class="area-busca">
            <input type="text" placeholder="Buscar produto…" />
            <button class="btn-produtos">
              <img
                src="https://img.icons8.com/ios/50/000000/ingredients.png"
              />
              Produtos
            </button>
          </div>
        </div>
        <div class="content">
          <div class="painel-lateral">
            <div class="criador">
              <label>Criado por: <strong>  </strong></label>
            </div>

            <input
              type="text"
              class="input"
              placeholder="Atendente responsável"
            />
            <textarea
              class="textarea"
              placeholder="Anotar observação..."
            ></textarea>

            <div class="toggle-area">
              <label>Bloquear pedido</label>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="menu-item">
              <span class="icon">👤</span> Vincular Cliente
            </div>

            <div class="menu-item">
              <span class="icon">☰</span> Mais opções
            </div>

            <div class="menu-item back">
              <a href="#" @click.prevent="$emit('close')">◀️ Voltar (Fechar)</a>
            </div>
          </div>

          <div class="items-area">
            <p class="msg-lan-itens">Nenhum item lançado.</p>
          </div>
        </div>
        <div class="footer">
          <button class="footer-btn">🖨️ Imprimir</button>

          <button class="footer-btn pagar">💳 Pagamento</button>
        </div>
      </div>
      </div>
  </div>
</template>

<script setup>
// 🟢 MODIFICAÇÃO 2: Uso da Composition API (<script setup>)
import { computed } from 'vue';
defineEmits(['close']);
const props = defineProps({
  mesaId: {
    type: [String, Number],
    required: true,
  }
});

// Define o evento 'close'

// Propriedade computada (igual ao que você tinha)
const mesaComandaTitulo = computed(() => {
  return `Mesa/Comanda: ${props.mesaId}`;
});

// A função de fechar é feita via @click="$emit('close')" no template
</script>

<style scoped>
/* 🟢 MODIFICAÇÃO 3: Adicionar o CSS do Modal Overlay para que ele flutue */

/* CSS do Overlay (fundo escuro transparente) */
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
.inicio {
  color: #666;
}

.area-busca {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.area-busca input {
  padding: 8px 12px;
  width: 200px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 10px;
  background-color: #d9d9d9;
  color: #999999;
}

.btn-produtos {
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 15px;
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

.msg-lan-itens {
  color: #777;
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
}

.footer-btn.pagar {
  background: #d0ffd0;
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

  .footer {
    flex-direction: column;
    align-items: center;
  }

  .footer-btn {
    width: 90%;
  }
}
</style>
