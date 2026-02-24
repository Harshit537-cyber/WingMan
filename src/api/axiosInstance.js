import axios from "axios";
import { getToken } from "../utils/token";

const axiosInstance = axios.create({
  // ✅ Add /api at the end of the URL
  baseURL: "https://api.wingmann.online/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// ... rest of your interceptor code
export default axiosInstance;