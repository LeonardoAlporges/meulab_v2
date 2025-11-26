import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
} from "axios";

import { getHttpErrorMessage } from "@utils/httpErrors";
import type {
  ApiErrorResponse,
  ApiErrorValue,
  ApiResponse,
  ApiSuccessResponse,
  BackendResponse,
} from "../types/api";

// Environment variables imported via babel-plugin-inline-dotenv
const API_URL_UFES = process.env.API_URL_UFES || "";
const API_URL_EXTERNAL = process.env.API_URL_EXTERNAL || "";
const UFES_GATEWAY_IP = process.env.UFES_GATEWAY_IP || "";
const UFES_SSID = process.env.UFES_SSID || "";
const API_TIMEOUT = Number.parseInt(process.env.API_TIMEOUT || "10000", 10);
const TOKEN_KEY = process.env.TOKEN_KEY || "";
const USER_KEY = process.env.USER_KEY || "";

interface NetInfoState {
  details?: {
    ipAddress?: string;
    ssid?: string;
  };
}

let isWifiUfes = false;

const verifyNetInfo = async (): Promise<void> => {
  const state = (await NetInfo.fetch()) as NetInfoState;
  if (
    state?.details?.ipAddress?.includes(UFES_GATEWAY_IP) ||
    state.details?.ssid === UFES_SSID
  ) {
    isWifiUfes = true;
  }
};

verifyNetInfo();

const resolvedBaseURL = isWifiUfes ? API_URL_UFES : API_URL_EXTERNAL;

const api: AxiosInstance = axios.create({
  baseURL: resolvedBaseURL,
  timeout: API_TIMEOUT,
});

const resolveUrl = (config: InternalAxiosRequestConfig) => {
  const method = (config.method || "GET").toUpperCase();
  const url = config.baseURL
    ? `${config.baseURL}${config.url}`
    : config.url || "";

  return { method, url };
};

const buildSuccessResponse = <T>(
  value: T,
  status: number
): ApiSuccessResponse<T> => ({
  isSuccess: true,
  isError: false,
  value,
  status,
});

const buildErrorResponse = (
  status?: number,
  value?: Partial<ApiErrorValue>
): ApiErrorResponse => {
  const resolvedStatus = value?.status ?? status ?? 500;

  return {
    isSuccess: false,
    isError: true,
    status: resolvedStatus,
    value: {
      status: resolvedStatus,
      errorMessage: value?.errorMessage ?? getHttpErrorMessage(resolvedStatus),
      errorCode: value?.errorCode,
      ...value,
    },
  };
};

const normalizeBackendResponse = <T>(
  data?: BackendResponse<T>,
  status?: number
): ApiResponse<T> => {
  const resolvedStatus = data?.status ?? status ?? 200;

  if (resolvedStatus > 202 && resolvedStatus < 500) {
    let errorMessage: string | undefined;

    if (typeof data === "string") {
      errorMessage = data;
    } else if (data && typeof data.value === "string") {
      errorMessage = data.value;
    } else if (data && (data as any).message) {
      errorMessage = (data as any).message;
    }

    return buildErrorResponse(resolvedStatus, {
      errorMessage: errorMessage || getHttpErrorMessage(resolvedStatus),
    });
  }

  if (
    data &&
    (data.isSuccess !== undefined ||
      data.isError !== undefined ||
      data.value !== undefined)
  ) {
    if (data.isSuccess !== false && data.isError !== true) {
      const value = (data.value ?? null) as T;
      return buildSuccessResponse(value, resolvedStatus);
    }

    return buildErrorResponse(resolvedStatus, data.value as ApiErrorValue);
  }

  // Caso o backend ainda não esteja seguindo o contrato.
  return buildSuccessResponse(
    (data as unknown as T) ?? (null as T),
    resolvedStatus
  );
};

const normalizeAxiosError = (error: unknown): ApiErrorResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<BackendResponse<ApiErrorValue>>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    if (data?.value) {
      return buildErrorResponse(status ?? data.value.status, data.value);
    }

    return buildErrorResponse(status);
  }

  return buildErrorResponse(undefined, {
    errorMessage: (error as Error)?.message ?? getHttpErrorMessage(),
  });
};

const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token || null;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    throw error;
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    }
    throw error;
  }
);

async function request<T>(
  method: Method,
  url: string,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api.request<BackendResponse<T>>({
      url,
      method,
      ...axiosConfig,
    });

    return normalizeBackendResponse<T>(response.data, response.status);
  } catch (error) {
    return normalizeAxiosError(error);
  }
}

export function post<T>(
  url: string,
  payload?: any,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("POST", url, { data: payload, params, ...axiosConfig });
}

export function get<T>(
  url: string,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("GET", url, { params, ...axiosConfig });
}

export function put<T>(
  url: string,
  payload?: any,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("PUT", url, { data: payload, params, ...axiosConfig });
}

export function patch<T>(
  url: string,
  payload?: any,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("PATCH", url, { data: payload, params, ...axiosConfig });
}

export function remove<T>(
  url: string,
  payload?: any,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("DELETE", url, { data: payload, params, ...axiosConfig });
}

const apiInstance = {
  post,
  get,
  put,
  patch,
  remove,
};

export default apiInstance;
