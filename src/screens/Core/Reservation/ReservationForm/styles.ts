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

export const TermsDescription = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
  marginTop: theme.spacing.md,
  marginBottom: theme.spacing.sm,
  lineHeight: 20,
  fontWeight: "600",
});

