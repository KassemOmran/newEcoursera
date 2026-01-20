import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Request interceptor
 * Adds Authorization token if present
 */
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecourse_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * Normalizes errors & handles auth expiry
 */
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Unauthorized → force logout
      if (error.response.status === 401) {
        localStorage.removeItem("ecourse_token");

        // Avoid infinite redirect loops
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: "Network error. Backend may be offline.",
    });
  }
);

export default axiosClient;
