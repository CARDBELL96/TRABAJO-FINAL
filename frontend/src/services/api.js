import axios from 'axios';

// Lee la URL base de la API desde las variables de entorno de Vite.
// Si no está definida, usa la URL local como fallback para desarrollo.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://taskflow-backend-94d4.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const checkHealth = () => apiClient.get('/health');

export default apiClient;
