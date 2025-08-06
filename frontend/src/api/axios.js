import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:   import.meta.env.MODE === "development"
    ? "http://localhost:3000/api" // your local backend URL
    : import.meta.env.VITE_API_URL, // your deployed backend URL from Vercel env
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
