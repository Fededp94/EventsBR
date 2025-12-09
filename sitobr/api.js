// src/api.js
import axios from "axios";

// In sviluppo: VITE_API_BASE_URL è definita (es: http://localhost:8080)
// In produzione: NON definiamo VITE_API_BASE_URL => baseURL = ""
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
