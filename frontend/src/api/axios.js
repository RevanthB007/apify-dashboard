import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use full backend URL from env
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("userapi");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
