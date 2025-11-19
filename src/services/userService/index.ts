import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";
import { LoginAsWatchmanRequest, LoginRequest, User } from "./types";

const login = async (credenciais: LoginRequest) => {
  return await apiInstance.post<User>(routes.user.login, credenciais);
};

const loginAsWatchman = async (credenciais: LoginAsWatchmanRequest) => {
  return await apiInstance.post<User>(routes.user.loginWatchman, credenciais);
};

export const userService = {
  login,
  loginAsWatchman,
};
