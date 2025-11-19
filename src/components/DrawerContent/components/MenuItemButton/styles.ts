import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { theme } from "@config/theme";

export const Button = styled.TouchableOpacity({
  width: "100%",
  minHeight: 52,
  paddingHorizontal: theme.spacing.sm,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  marginBottom: theme.spacing.xs,
  marginTop: theme.spacing.xs,
  backgroundColor: theme.colors.primary,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.15)",
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
});

export const MenuIcon = styled(MaterialIcons)({
  fontSize: 22,
  color: theme.colors.background,
  marginRight: theme.spacing.sm,
});

export const ArrowIcon = styled(MaterialIcons)({
  fontSize: 24,
  color: theme.colors.background,
});

export const labelStyles = StyleSheet.create({
  title: {
    flex: 1,
    color: theme.colors.background,
  },
});
