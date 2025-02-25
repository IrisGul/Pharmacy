import axios, { AxiosInstance } from "axios";

// Definiere den Basis-URL der API
const API_BASE_URL = "https://localhost:7184/swagger/index.html"; // Falls du auf einem echten Gerät testest, ersetze localhost

// Erstelle eine Axios-Instanz mit Typisierung
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
