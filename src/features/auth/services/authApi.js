import httpClient from "../../../services/httpClient";
import { AUTH_ENDPOINTS } from "../auth.types";

export const authApi = {
  login: (credentials) =>
    httpClient.post(AUTH_ENDPOINTS.LOGIN, credentials),

  register: (userData) =>
    httpClient.post(AUTH_ENDPOINTS.REGISTER, userData),

  getMe: () =>
    httpClient.get(AUTH_ENDPOINTS.ME),
};