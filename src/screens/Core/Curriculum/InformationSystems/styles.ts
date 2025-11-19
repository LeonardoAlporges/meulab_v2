import styled from "@emotion/native";

import { theme } from "@config/theme";

export const PeriodCard = styled.View({
  backgroundColor: theme.colors.background,
  borderRadius: 12,
  padding: theme.spacing.lg,
  marginTop: theme.spacing.md,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.08)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 1,
});

export const PeriodHeader = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing.sm,
});

export const PeriodTitle = styled.Text({
  fontSize: theme.font.heading.sm.fontSize,
  fontFamily: theme.font.heading.sm.fontFamily,
  color: theme.colors.primary,
});

export const DisciplineCount = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
});

export const DisciplineItem = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.xs,
});

export const Bullet = styled.View({
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.colors.secondary,
  marginRight: theme.spacing.sm,
});

export const DisciplineText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  flex: 1,
  lineHeight: 20,
});

