import axios from 'axios';
import { SYSTEM_KEY } from '../config/Constent';

const BASE_URL = "http://localhost:3000/api";

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as { headers?: Record<string, string>; _retry?: boolean } & object;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(SYSTEM_KEY.REFRESH_TOKEN);
      if (!refreshToken) {
        processQueue(error, null);
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${BASE_URL}/auth/refresh-token`, { refresh_token: refreshToken });
        const { access_token, refresh_token: newRefreshToken } = res.data;
        localStorage.setItem(SYSTEM_KEY.ACCESS_TOKEN, access_token);
        localStorage.setItem(SYSTEM_KEY.REFRESH_TOKEN, newRefreshToken);
        processQueue(null, access_token);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        localStorage.removeItem(SYSTEM_KEY.ACCESS_TOKEN);
        localStorage.removeItem(SYSTEM_KEY.REFRESH_TOKEN);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const UseAxios = <T = any>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any, params?: any) => {
  return api.request<T>({
    url: `/${url}`,
    method,
    data,
    params,
  });
};
