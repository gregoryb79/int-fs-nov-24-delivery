import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", 
});


api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (!config.headers) config.headers = {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

