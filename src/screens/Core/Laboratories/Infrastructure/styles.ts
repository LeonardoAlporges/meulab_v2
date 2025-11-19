import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";

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
  marginBottom: theme.spacing.md,
});

export const TextThree = styled.Text({
  fontSize: theme.font.paragraph.md2.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: theme.colors.primary,
  marginLeft: theme.spacing.sm,
});

export const BuildingSection = styled.View({
  marginBottom: theme.spacing.lg,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
});

export const BuildingTitle = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.md,
});

export const BuildingIcon = styled(MaterialIcons)({
  fontSize: 24,
  color: theme.colors.primary,
});

export const LabList = styled.View({
  marginLeft: theme.spacing.md,
});

export const LabItem = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.sm,
});

export const LabIcon = styled(MaterialIcons)({
  fontSize: 20,
  color: theme.colors.secondary,
  marginRight: theme.spacing.sm,
});

export const LabText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  flex: 1,
});

