// Cliente de API con Axios
import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Crear instancia de Axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request para añadir token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ✅ FIXED: Changed from 'accessToken' to 'token'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      console.log('🚨 API Interceptor: 401 detected, clearing localStorage');
      localStorage.removeItem('token'); // ✅ FIXED: Changed from 'accessToken' to 'token'
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
