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
  fontSize: theme.font.heading.md.fontSize,
  fontFamily: theme.font.heading.md.fontFamily,
  color: theme.colors.primary,
  marginBottom: theme.spacing.sm,
});

export const TextOne = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  marginBottom: theme.spacing.md,
  lineHeight: 20,
});

export const TextThree = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
  color: theme.colors.secondary,
  marginBottom: theme.spacing.sm,
  fontWeight: "600",
});

export const CheckboxContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginTop: theme.spacing.md,
});

export const CheckboxText = styled.Text({
  flex: 1,
  marginLeft: theme.spacing.sm,
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.text,
  lineHeight: 20,
});

export const WebViewContainer = styled.View({
  flex: 1,
  borderRadius: 12,
  overflow: "hidden",
});

