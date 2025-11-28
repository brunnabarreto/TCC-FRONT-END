import api from "./api";

export default {
  listarMesas() {
    return api.get("/principal/mesas/abertas"); // Ajuste aqui para a sua rota real
  }
};
