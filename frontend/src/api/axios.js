import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/api/' : '/api',
  timeout: 10000,
  headers:{ 
    "Content-Type": "application/json",
    // 'Authorization': `Bearer apify_api_jVc7BX8RRyQ3qMdvGh2hVmFLCp5Qyg03Ur0H`
  },
  withCredentials: true,
});