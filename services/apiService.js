import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from '../config/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Common API methods
export const apiService = {
  get: (endpoint) => api.get(endpoint),
  post: (endpoint, data) => api.post(endpoint, data),
  put: (endpoint, data) => api.put(endpoint, data),
  delete: (endpoint) => api.delete(endpoint),
};

export default apiService;