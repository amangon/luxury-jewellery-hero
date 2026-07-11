import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://backend-uyrm.onrender.com/api"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
// Attach JWT from localStorage to every request, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("lj_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralize 401 handling: clear stale token so the UI drops back to
// a logged-out state instead of silently failing every request.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("lj_token");
      localStorage.removeItem("lj_user");
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";

export default api;
