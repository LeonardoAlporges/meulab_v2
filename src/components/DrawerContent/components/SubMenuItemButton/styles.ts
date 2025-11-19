import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { theme } from "@config/theme";

export const Button = styled.TouchableOpacity({
  width: "100%",
  minHeight: 44,
  paddingHorizontal: theme.spacing.md,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  marginBottom: theme.spacing.xs,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
});

export const ArrowIcon = styled(MaterialIcons)({
  fontSize: 22,
  color: theme.colors.background,
});

export const labelStyles = StyleSheet.create({
  title: {
    flex: 1,
    paddingLeft: theme.spacing.sm,
    color: theme.colors.background,
  },
});

