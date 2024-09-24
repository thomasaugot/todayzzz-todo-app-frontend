import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
