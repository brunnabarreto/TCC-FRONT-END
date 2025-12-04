import api from "./api";

export default {
  listarMesas() {
    return api.get("/principal/mesas/abertas");
  },

  obterMesaPorNumero(numeroMesa) {
    return api.get(`/principal/mesas/por-numero/${numeroMesa}`);
  },

  obterMesaPorId(id) {
    return api.get(`/principal/mesas/${id}`);
  },

  criarMesa(mesaData) {
    return api.post("/principal/mesas", mesaData);
  },

  atualizarMesa(id, mesaData) {
    return api.put(`/principal/mesas/${id}`, mesaData);
  },

  deletarMesa(id) {
    return api.delete(`/principal/mesas/${id}`);
  }
};
