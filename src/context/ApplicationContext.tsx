import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import * as React from "react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { moment } from "@config/config";

export interface AppProviderProps {
  children: React.ReactNode;
}

export interface ApplicationContextData {
  moment: typeof moment;
  getTokenExpo: () => Promise<string | null>;
  isWifiUfes: boolean;
}

const ApplicationContext = React.createContext<ApplicationContextData>(
  {} as ApplicationContextData
);

const EXPO_TOKEN_KEY = "@ExpoToken";

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isWifiUfes, setIsWifiUfes] = useState<boolean>(false);

  const getTokenExpo = useCallback(async (): Promise<string | null> => {
    return await AsyncStorage.getItem(EXPO_TOKEN_KEY);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      try {
        const details = state.details as { ssid?: string } | null;
        const isOnEduroam = details?.ssid === "eduroam";
        setIsWifiUfes(isOnEduroam || false);
      } catch (error) {
        console.error("Error in NetInfo callback:", error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = useMemo(
    () => ({ moment, getTokenExpo, isWifiUfes }),
    [getTokenExpo, isWifiUfes]
  );

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = (): ApplicationContextData => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("useApplication must be used within an AppProvider");
  }

  return context;
};

export default AppProvider;
