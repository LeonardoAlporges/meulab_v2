import { StyleSheet } from "react-native";
import styled from "@emotion/native";

import { theme } from "@config/theme";

export const ErrorCard = styled.View({
  marginTop: theme.spacing.lg,
  padding: theme.spacing.md,
  borderRadius: 12,
  backgroundColor: "rgba(192, 57, 43, 0.08)",
  borderWidth: 1,
  borderColor: "rgba(192, 57, 43, 0.3)",
});

export const labelStyles = StyleSheet.create({
  errorText: {
    color: "#C0392B",
  },
});

