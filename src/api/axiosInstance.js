// src/api/axiosInstance.js

import axios from "axios";
import { getToken } from "../utils/token";

const axiosInstance = axios.create({
  baseURL: "https://wingmann.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
