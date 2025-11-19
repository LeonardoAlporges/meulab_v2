import styled from "@emotion/native";

import { theme } from "@config/theme";

export const CardContainer = styled.TouchableOpacity({
  backgroundColor: theme.colors.background,
  borderRadius: 8,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.sm,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
});

export const CardHeader = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing.sm,
});

export const CardTitle = styled.Text({
  fontSize: theme.font.heading.sm.fontSize,
  fontFamily: theme.font.heading.sm.fontFamily,
  fontWeight: "700",
  color: theme.colors.primary,
});

export const StatusBadge = styled.View<{
  backgroundColor: string;
  borderColor: string;
}>(({ backgroundColor, borderColor }) => ({
  backgroundColor,
  borderWidth: 1,
  borderColor,
  borderRadius: 12,
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs,
}));

export const StatusText = styled.Text<{ color: string }>(({ color }) => ({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
  fontWeight: "700",
  color,
}));

export const CardContent = styled.View({
  marginTop: theme.spacing.xs,
});

export const CardRow = styled.View({
  flexDirection: "row",
  marginBottom: theme.spacing.xs,
  alignItems: "flex-start",
});

export const CardLabel = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
  fontWeight: "600",
  minWidth: 100,
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
  color: "#999",
  textAlign: "center",
});

export const LegendsContainer = styled.View({
  backgroundColor: theme.colors.background,
  borderRadius: 8,
  padding: theme.spacing.md,
  marginTop: theme.spacing.md,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
});

export const LegendsTitle = styled.Text({
  fontSize: theme.font.paragraph.md2.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: theme.colors.primary,
  marginBottom: theme.spacing.sm,
});

export const LegendItem = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.sm,
});

export const LegendBadge = styled.View<{
  backgroundColor: string;
  borderColor: string;
}>(({ backgroundColor, borderColor }) => ({
  backgroundColor,
  borderWidth: 1,
  borderColor,
  borderRadius: 12,
  width: 24,
  height: 24,
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing.sm,
}));

export const LegendDot = styled.View<{ color: string }>(({ color }) => ({
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: color,
}));

export const LegendText = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.text,
  flex: 1,
});

