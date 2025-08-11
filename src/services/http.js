import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // apunta a /peliculas
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || "Error de red";
    return Promise.reject(new Error(message));
  }
);