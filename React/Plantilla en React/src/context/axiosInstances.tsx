/// <reference types="vite/client" />
import axios from "axios";


const baseURL = `${import.meta.env.VITE_BACKEND_URL}`;

export const axiosInstance = axios.create({
  baseURL,
});

// Interceptor de solicitudes: adjunta el token de acceso
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

