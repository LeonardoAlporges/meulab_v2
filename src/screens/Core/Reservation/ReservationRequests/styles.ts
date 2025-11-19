import styled from "@emotion/native";

import { theme } from "@config/theme";

export const CardContainer = styled.TouchableOpacity({
  backgroundColor: theme.colors.background,
  borderRadius: 10,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.sm,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
  elevation: 2,
});

export const CardHeader = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing.sm,
});

export const CardTitle = styled.Text({
  fontSize: theme.font.heading.sm.fontSize,
  fontFamily: theme.font.heading.sm.fontFamily,
  color: theme.colors.primary,
  fontWeight: "700",
});

export const StatusBadge = styled.View<{
  backgroundColor: string;
  borderColor: string;
}>(({ backgroundColor, borderColor }) => ({
  backgroundColor,
  borderWidth: 1,
  borderColor,
  borderRadius: 14,
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs,
}));

export const StatusText = styled.Text<{ color: string }>(({ color }) => ({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color,
  fontWeight: "700",
}));

export const CardContent = styled.View({
  marginTop: theme.spacing.xs,
});

export const CardRow = styled.View({
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: theme.spacing.xs,
});

export const CardLabel = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
  fontWeight: "600",
  minWidth: 120,
});

export const CardValue = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.text,
  flex: 1,
});

export const EmptyContainer = styled.View({
  padding: theme.spacing.xl,
  alignItems: "center",
  justifyContent: "center",
});

export const EmptyText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: "#9E9E9E",
  textAlign: "center",
});

export const LegendsContainer = styled.View({
  backgroundColor: theme.colors.background,
  borderRadius: 10,
  padding: theme.spacing.md,
  marginTop: theme.spacing.lg,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
});

export const LegendsTitle = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.primary,
  fontWeight: "700",
  marginBottom: theme.spacing.sm,
});

export const LegendItem = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.xs,
});

export const LegendDot = styled.View<{ color: string }>(({ color }) => ({
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: color,
  marginRight: theme.spacing.sm,
}));

export const LegendText = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.text,
});

