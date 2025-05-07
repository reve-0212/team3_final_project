import {AuthApi} from "./AuthAPI.jsx";

/** SIGNUP API */
export const signUp = async ({ username, password }) => {
  const data = { username, password };
  const response = await AuthApi.post(`/api/v1/auth/signup`, data);
  return response.data;
}