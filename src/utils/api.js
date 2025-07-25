import axios from "axios";

const api = axios.create({
  //   baseURL: import.meta.env.VITE_URL,
  baseURL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
/* api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle errors during the request configuration
    return Promise.reject(error);
  }
);
 */
export default api;
