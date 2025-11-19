import {
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Font from "expo-font";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { Platform, StatusBar as RNStatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvider } from "@context/ApplicationContext";
import { AuthProvider } from "@context/AuthContext";
import { LoadingProvider } from "@context/LoadingContext";
import { ModalProvider } from "@context/ModalContext";
import Routes from "./routes";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationChannelAsync("default", {
  name: "default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  await Location.requestForegroundPermissionsAsync();

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  await AsyncStorage.setItem("@ExpoToken", token ?? "");
}

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function prepare() {
      try {
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
          Poppins_300Light,
          Poppins_100Thin,
          Poppins_600SemiBold,
        });
      } catch (e) {
        console.error("Error loading fonts:", e);
      }

      if (!isMounted) return;

      setAppIsReady(true);

      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.error("Error hiding splash screen:", e);
      }
    }

    prepare().catch((error) => {
      console.error("Fatal error in prepare:", error);
      setAppIsReady(true);
      SplashScreen.hideAsync().catch(() => {});
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
        paddingBottom:
          Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
    >
      <LoadingProvider>
        <ModalProvider>
          <AppProvider>
            <AuthProvider>
              <NativeBaseProvider>
                <StatusBar style="dark" />
                <Routes />
              </NativeBaseProvider>
            </AuthProvider>
          </AppProvider>
        </ModalProvider>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}
