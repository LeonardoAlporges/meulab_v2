import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";
import {
  ChangeCoordinatorRequest,
  LoginAsWatchmanRequest,
  LoginRequest,
  User,
} from "./types";

const login = async (credenciais: LoginRequest) => {
  return await apiInstance.post<User>(routes.user.login, credenciais);
};

const loginAsWatchman = async (credenciais: LoginAsWatchmanRequest) => {
  return await apiInstance.post<User>(routes.user.loginWatchman, credenciais);
};

const changeCoordinator = async (data: ChangeCoordinatorRequest) => {
  return await apiInstance.post<void>(routes.user.defineCoordinator, data);
};

export const userService = {
  login,
  loginAsWatchman,
  changeCoordinator,
};
