import styled from "@emotion/native";

import { theme } from "@config/theme";

export const PointsWrapper = styled.ScrollView({
  maxHeight: 320,
  marginTop: theme.spacing.md,
});

export const CategorySection = styled.View({
  marginBottom: theme.spacing.md,
  backgroundColor: theme.colors.background,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.08)",
  padding: theme.spacing.md,
});

export const CategoryHeader = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.sm,
});

export const CategoryTitle = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: theme.colors.primary,
  marginLeft: theme.spacing.sm,
});

export const PointButton = styled.TouchableOpacity<{
  isActive: boolean;
}>(({ isActive }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: theme.spacing.sm,
  paddingHorizontal: theme.spacing.md,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: isActive ? theme.colors.primary : "rgba(20, 51, 89, 0.1)",
  backgroundColor: isActive ? "rgba(20, 51, 89, 0.08)" : theme.colors.background,
  marginBottom: theme.spacing.sm,
}));

export const PointIconContainer = styled.View<{ isActive: boolean }>(
  ({ isActive }) => ({
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: isActive ? theme.colors.primary : "rgba(20, 51, 89, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  })
);

export const PointText = styled.Text<{ isActive: boolean }>(
  ({ isActive }) => ({
    flex: 1,
    fontSize: theme.font.paragraph.md.fontSize,
    fontFamily: theme.font.paragraph.md.fontFamily,
    color: isActive ? theme.colors.primary : theme.colors.text,
  })
);

export const ButtonsRow = styled.View({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing.sm,
});

