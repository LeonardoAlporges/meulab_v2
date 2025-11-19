import AsyncStorage from "@react-native-async-storage/async-storage";
import { userService } from "@services/userService";
import { LoginRequest, User } from "@services/userService/types";
import * as React from "react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CryptoJS from "react-native-crypto-js";

import { useApplication } from "./ApplicationContext";
import { useLoading } from "./LoadingContext";
import { useModal } from "./ModalContext";

interface LoginCredentials {
  userLogin: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsWatchman: (credentials: LoginCredentials) => Promise<void>;
  verifyLogin: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  initializing: boolean;
}

const AuthContext = React.createContext<AuthContextData | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const { showModal } = useModal();
  const { getTokenExpo } = useApplication();

  const USER_STORAGE_KEY = process.env.USER_STORAGE_KEY || "";
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";
  const TOKEN_KEY = process.env.TOKEN_KEY || "";

  const { showLoading, hideLoading } = useLoading();

  function encryptValue(value: string): string {
    return CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  }

  useEffect(() => {
    async function loadUserFromStorage() {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do AsyncStorage:", error);
      } finally {
        setInitializing(false);
      }
    }

    loadUserFromStorage();
  }, [USER_STORAGE_KEY]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setLoading(true);
        showLoading();
        const expoToken = await getTokenExpo();

        const response = await userService.login({
          userLogin: encryptValue(credentials.userLogin),
          password: encryptValue(credentials.password),
          expoToken: expoToken || "",
        } as LoginRequest);

        if (response.isSuccess) {
          await AsyncStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(response.value)
          );
          setUser(response.value);
        } else if (response.isError) {
          showModal({
            description: response.isError ? response.value.errorMessage : "",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        hideLoading();
        setLoading(false);
      }
    },
    [ENCRYPTION_KEY, USER_STORAGE_KEY, getTokenExpo, hideLoading, showLoading]
  );

  const loginAsWatchman = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setLoading(true);
        const response = await userService.login(credentials as LoginRequest);
        if (response.isSuccess) {
          await AsyncStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(response.value)
          );
          setUser(response.value);
        } else if (response.isError) {
          showModal({
            description: response.isError ? response.value.errorMessage : "",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [USER_STORAGE_KEY]
  );

  const verifyLogin = useCallback(async () => {
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      showLoading();
      await AsyncStorage.multiRemove(
        [USER_STORAGE_KEY, TOKEN_KEY].filter(Boolean)
      );
      setUser(null);
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    } finally {
      hideLoading();
    }
  }, [USER_STORAGE_KEY, TOKEN_KEY, showLoading, hideLoading]);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      loginAsWatchman,
      verifyLogin,
      logout,
      loading,
      initializing,
    }),
    [user, login, loginAsWatchman, verifyLogin, logout, loading, initializing]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
