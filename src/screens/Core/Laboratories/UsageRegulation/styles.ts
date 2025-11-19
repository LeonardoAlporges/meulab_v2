import styled from "@emotion/native";

import { theme } from "@config/theme";

export const ContentContainer = styled.View({
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.md,
});

export const Title = styled.Text({
  fontSize: theme.font.heading.md.fontSize,
  fontFamily: theme.font.heading.md.fontFamily,
  fontWeight: "700",
  color: theme.colors.primary,
  marginBottom: theme.spacing.md,
});

export const TextOne = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  lineHeight: 24,
  marginBottom: theme.spacing.lg,
});

export const ButtonsContainer = styled.View({
  marginTop: theme.spacing.md,
});

export const WebViewContainer = styled.View({
  flex: 1,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.md,
});

