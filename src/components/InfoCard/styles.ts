import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { theme } from "@config/theme";

export const Container = styled.View({
  flexDirection: "row",
  padding: theme.spacing.md,
  borderRadius: 12,
  backgroundColor: "rgba(20, 51, 89, 0.05)",
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
  marginBottom: theme.spacing.md,
  alignItems: "center",
});

export const IconContainer = styled.View({
  marginRight: theme.spacing.sm,
  justifyContent: "center",
});

export const Icon = styled(MaterialIcons)`
  font-size: 24px;
  color: ${theme.colors.primary};
`;

export const Content = styled.View({
  flex: 1,
});

export const labelStyles = StyleSheet.create({
  title: {
    marginBottom: theme.spacing.xs / 2,
    color: theme.colors.text,
  },
  description: {
    color: theme.colors.secondary,
  },
});

