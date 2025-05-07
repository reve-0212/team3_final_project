import {AuthApi} from "./AuthAPI.jsx";

export const login = async ({ username, password }) => {
  const data = { username, password };
  const response = await AuthApi.post(`/api/v1/auth/login`, data);
  return response.data;
}