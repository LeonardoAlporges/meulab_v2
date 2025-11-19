import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
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

console.log("🔗 [API] Base URL selecionada:", resolvedBaseURL || "<vazio>");

const api: AxiosInstance = axios.create({
  baseURL: resolvedBaseURL,
  timeout: API_TIMEOUT,
});

const COLORS = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m",
};

const resolveUrl = (config: InternalAxiosRequestConfig) => {
  const method = (config.method || "GET").toUpperCase();
  const url = config.baseURL
    ? `${config.baseURL}${config.url}`
    : config.url || "";

  return { method, url };
};

const logRequest = (config: InternalAxiosRequestConfig, token?: string) => {
  const { method, url } = resolveUrl(config);

  console.log(
    `${COLORS.cyan}📡 [API]${COLORS.reset} ${COLORS.magenta}${method}${COLORS.reset} ${url} ${
      token ? `${COLORS.gray}(auth)` : ""
    }`
  );

  if (config.data) {
    console.log(
      `${COLORS.gray}↳ payload:${COLORS.reset}`,
      typeof config.data === "string"
        ? config.data
        : JSON.stringify(config.data, null, 2)
    );
  }
};

const logResponse = (
  response: AxiosResponse,
  { isError = false }: { isError?: boolean } = {}
) => {
  const { method, url } = resolveUrl(response.config);
  const icon = isError ? "❌" : "✅";
  const color = isError ? COLORS.magenta : COLORS.cyan;

  console.log(
    `${color}📥 [API]${COLORS.reset} ${icon} ${COLORS.magenta}${method}${COLORS.reset} ${url} ${COLORS.gray}status:${COLORS.reset} ${response.status}`
  );

  if (isError && response.data) {
    console.log(
      `${COLORS.gray}↳ erro:${COLORS.reset}`,
      typeof response.data === "string"
        ? response.data
        : JSON.stringify(response.data, null, 2)
    );
  }
};

const logAxiosError = (error: AxiosError) => {
  if (error.response) {
    logResponse(error.response, { isError: true });
    return;
  }

  const method = (error.config?.method || "GET").toUpperCase();
  const url = error.config?.baseURL
    ? `${error.config.baseURL}${error.config.url}`
    : error.config?.url || "<desconhecida>";

  console.log(
    `${COLORS.magenta}📥 [API]❌${COLORS.reset} ${COLORS.magenta}${method}${COLORS.reset} ${url} ${COLORS.gray}status:${COLORS.reset} <sem resposta>`
  );
  if (error.message) {
    console.log(`${COLORS.gray}↳ erro:${COLORS.reset} ${error.message}`);
  }
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

// Function to get token from AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token || null;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// Interceptor to add token to requests
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logRequest(config, token ?? undefined);

    console.log(config.baseURL, config.url);

    return config;
  },
  (error: AxiosError) => {
    throw error;
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  async (response) => {
    logResponse(response);
    return response;
  },
  async (error: AxiosError) => {
    logAxiosError(error);

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    }
    throw error;
  }
);

/**
 * Generic request wrapper
 * Retorna resposta padronizada: { value: T, status: number } para sucesso
 * Lança erro (throw) caso a requisição falhe
 */
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

/**
 * POST request
 */
export function post<T>(
  url: string,
  payload?: any,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("POST", url, { data: payload, params, ...axiosConfig });
}

/**
 * GET request
 */
export function get<T>(
  url: string,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("GET", url, { params, ...axiosConfig });
}

/**
 * PUT request
 */
export function put<T>(
  url: string,
  payload?: any,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("PUT", url, { data: payload, params, ...axiosConfig });
}

/**
 * PATCH request
 */
export function patch<T>(
  url: string,
  payload?: any,
  params?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return request<T>("PATCH", url, { data: payload, params, ...axiosConfig });
}

/**
 * DELETE request
 */
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
