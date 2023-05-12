import axios, { InternalAxiosRequestConfig } from "axios";

export const APP_URL = "http://localhost:3000";

export const AUTH_ENDPOINTS = {
  REFRESH: "api/refresh",
  LOGIN: "api/login",
  REGISTER: "api/registration",
  LOGOUT: "api/logout",
};

export const authApi = axios.create({
  withCredentials: true,
  baseURL: APP_URL,
});


authApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return config;
});

authApi.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const origRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        origRequest._isRetry = true;
        const res = await axios.get(`${APP_URL}${AUTH_ENDPOINTS.REFRESH}`, {
          withCredentials: true,
        });
        localStorage.setItem("access_token", res.data.accessToken);
        return authApi.request(origRequest);
      } catch (error) {
        console.error(error);
      }
    }
    throw error;
  }
);
