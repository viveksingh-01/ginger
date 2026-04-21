import axios from 'axios';
const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const guestId = localStorage.getItem('guestId');
    if (guestId) {
      config.headers['X-Guest-Id'] = guestId;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Handle 401 globally
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
