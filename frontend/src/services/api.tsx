import axios from "axios";

// Configuração padrão para chamadas de API
const api = axios.create({
  baseURL: "http://localhost:8000/", // Altere para sua URL base
});

// Interceptor para adicionar o token JWT em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
