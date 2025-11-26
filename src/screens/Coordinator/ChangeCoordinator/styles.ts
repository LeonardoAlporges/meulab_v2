import styled from "@emotion/native";

import { theme } from "@config/theme";

export const FormContainer = styled.View({
  backgroundColor: theme.colors.background,
  borderRadius: 12,
  padding: theme.spacing.lg,
  marginTop: theme.spacing.md,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.08)",
});

export const RestrictedContainer = styled.View({
  marginTop: theme.spacing.lg,
  padding: theme.spacing.lg,
  borderRadius: 12,
  backgroundColor: "rgba(199, 43, 61, 0.08)",
  borderWidth: 1,
  borderColor: "rgba(199, 43, 61, 0.3)",
});

export const RestrictedText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.secondary,
  textAlign: "center",
});

