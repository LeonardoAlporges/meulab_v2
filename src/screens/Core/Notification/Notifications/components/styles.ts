import styled from "@emotion/native";

import { theme } from "@config/theme";

export const CardContainer = styled.TouchableOpacity<{ isRead: boolean }>(
  ({ isRead }) => ({
    backgroundColor: isRead ? theme.colors.background : "#E8F0FE",
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: isRead ? "rgba(20, 51, 89, 0.08)" : "rgba(33, 150, 243, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  })
);

export const CardHeader = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing.xs,
});

export const Title = styled.Text({
  fontSize: theme.font.paragraph.md2.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: theme.colors.primary,
  flex: 1,
  marginRight: theme.spacing.sm,
});

export const Description = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.text,
  lineHeight: 20,
});

export const Footer = styled.View({
  marginTop: theme.spacing.sm,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const UnreadBadge = styled.View({
  backgroundColor: "#1E88E5",
  borderRadius: 12,
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs / 2,
});

export const DateText = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
});

export const UnreadBadgeText = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.background,
});

