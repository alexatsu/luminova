import { AUTH_ENDPOINTS, authApi } from "../api/axios.auth";
import { AuthData, AuthResponse } from "../types/User.types";

export const signUpUserFn = async (data: AuthData) => {
  const response = await authApi.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, data);
  return response.data;
};

export const loginUserFn = async (data: AuthData) => {
  const response = await authApi.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, data);
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.post<any>(AUTH_ENDPOINTS.LOGOUT);
  return response.data;
};
export const refreshUserFn = async () => {
  const response = await authApi.get<AuthResponse>(AUTH_ENDPOINTS.REFRESH);
  return response.data;
};
