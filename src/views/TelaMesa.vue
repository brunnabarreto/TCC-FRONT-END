<template>
  <div class="main-container">

    <div class="menu">
      <div class="menu-item">PRINCIPAL</div>
      <div class="menu-item">PRODUTOS</div>
      <div class="menu-item">BENEFÍCIOS</div>
      <div class="menu-item">FINANCEIRO</div>
      <div class="menu-item">RELATÓRIOS</div>
      <div class="menu-item">CONFIGURAÇÕES</div>

      <div class="pesquisa" style="width:200px;">
        <img :src="imgBuscar" alt="iconebusca">
        <input type="text" placeholder="Pesquisar">
      </div>
    </div>

    <div class="icon-bar">
      <div class="icon-box"><span class="icon-label"> <img :src="imgAbrirFechar" alt="Abrir/Fechar"> <br>Abrir / Fechar</span> </div>
      <div class="icon-box"><span class="icon-label"> <img :src="imgMesa" alt="Mesas"> <br>Mesas</span></div>
      <div class="icon-box"><span class="icon-label"> <img :src="imgDelivery" alt="Delivery"> <br>Delivery</span></div>
      <div class="icon-box"><span class="icon-label"> <img :src="imgCaixa" alt="Caixa/PDV"> <br>Caixa / PDV</span></div>
      <div class="icon-box"><span class="icon-label"> <img :src="imgFila" alt="Fila"> <br>Fila</span></div>
      <div class="icon-box"><span class="icon-label"> <img :src="imgAgendamento" alt="Agendados"> <br>Agendados</span></div>
      <div class="icon-box"><span class="icon-label"> <img :src="imgNfc" alt="NF-e"> <br>NF-e</span></div>
      <div class="logo"> <img :src="imgLogo" alt="logo"> </div>
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
      <div>Usuário: Camilla Viana administrador</div>
      <div>Registrado para: Restaurante Encantos da Maré</div>
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
  white-space: nowrap;
}

.menu-item:hover {
  background: #8a8888;
  color: #F5F5F5;
}

.icon-bar {
  display: flex;
  gap: 30px;
  padding: 20px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
}

.icon-box {
  width: 100px;
  height: 80px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
  padding: 8px;
  text-align: center;
  cursor: pointer;
  flex-shrink: 0;
}

.icon-box:hover {
  background-color: #eeeeee;
}

.icon-box img {
  width: 60px;
  height: 60px;
}

.logo img {
  height: 160px;
  width: 230px;
  flex-shrink: 0;
}

.icon-label {
  font-size: 13px;
  margin-top: 5px;
  display: block;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
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
  min-width: 200px;
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
  white-space: nowrap;
  flex-shrink: 0;
}

.button:hover {
  background: #eeeeee;
}

.grade-mesas {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
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
  min-width: 80px;
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
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

/* Responsividade para telas menores */
@media (max-width: 1200px) {
  .icon-bar {
    gap: 15px;
  }

  .icon-box {
    width: 80px;
    height: 70px;
  }

  .icon-box img {
    width: 50px;
    height: 50px;
  }

  .logo img {
    height: 120px;
    width: 170px;
  }
}

@media (max-width: 768px) {
  .menu {
    gap: 10px;
  }

  .menu-item {
    padding: 4px 8px;
    font-size: 12px;
  }

  .icon-bar {
    gap: 10px;
  }

  .icon-box {
    width: 70px;
    height: 60px;
    padding: 4px;
  }

  .icon-box img {
    width: 40px;
    height: 40px;
  }

  .icon-label {
    font-size: 10px;
  }

  .logo img {
    height: 100px;
    width: 140px;
  }

  .actions {
    gap: 10px;
    padding: 8px 10px;
  }

  .buscar-num {
    width: 150px;
  }

  .button {
    padding: 6px 12px;
    font-size: 11px;
  }

  .grade-mesas {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 8px;
    padding: 10px;
  }

  .mesa {
    height: 70px;
    font-size: 12px;
  }
}
</style>
