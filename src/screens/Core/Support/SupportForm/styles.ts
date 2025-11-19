import styled from "@emotion/native";

import { theme } from "@config/theme";

export const FormContainer = styled.View({
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.md,
});

export const Row = styled.View({
  flexDirection: "row",
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.sm,
});

