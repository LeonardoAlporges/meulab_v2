import styled from "@emotion/native";

import { theme } from "@config/theme";

export const ContentContainer = styled.View({
  flex: 1,
  width: "100%",
  marginTop: theme.spacing.md,
});

export const EmptyContainer = styled.View({
  padding: theme.spacing.lg,
  alignItems: "center",
  justifyContent: "center",
});

export const EmptyText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.secondary,
  textAlign: "center",
});

export const LoadingText = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
  textAlign: "center",
  marginTop: theme.spacing.sm,
});

