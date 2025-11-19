import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Loading } from "@components/Loading/Loading";

interface LoadingProviderProps {
  children: React.ReactNode;
}

export interface LoadingContextData {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextData | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  const value = useMemo(
    () => ({
      isLoading,
      showLoading,
      hideLoading,
    }),
    [isLoading, showLoading, hideLoading]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Loading showLoading={isLoading} />
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextData => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};

export default LoadingProvider;
