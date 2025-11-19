import styled from "@emotion/native";

import { theme } from "@config/theme";

export const ContentContainer = styled.View({
  backgroundColor: theme.colors.background,
  borderRadius: 12,
  padding: theme.spacing.lg,
  marginTop: theme.spacing.md,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.08)",
});

export const Title = styled.Text({
  fontSize: theme.font.heading.sm.fontSize,
  fontFamily: theme.font.heading.sm.fontFamily,
  color: theme.colors.primary,
  marginBottom: theme.spacing.sm,
});

export const Text = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  lineHeight: 20,
});

export const Highlight = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
  marginTop: theme.spacing.xs,
});

