import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restapp-backend.onrender.com',
})

// Interceptor para injetar o token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (!config.url.includes("/auth/login") && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
