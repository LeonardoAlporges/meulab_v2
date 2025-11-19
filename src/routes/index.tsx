import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "@context/AuthContext";
import AppRoutes from "./app.routes";
import AuthRoute from "./auth.routes";

function Routes(): React.JSX.Element {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AuthRoute /> : <AppRoutes />}
    </NavigationContainer>
  );
}

export default Routes;
