export interface ApiErrorValue {
  errorMessage: string;
  errorCode?: string | number;
  status?: number;
  [key: string]: any;
}

export interface ApiSuccessResponse<T> {
  isSuccess: true;
  isError: false;
  value: T;
  status: number;
}

export interface ApiErrorResponse {
  isSuccess: false;
  isError: true;
  value: ApiErrorValue;
  status: number;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface BackendResponse<T> {
  isSuccess?: boolean;
  isError?: boolean;
  value?: T;
  status?: number;
}

