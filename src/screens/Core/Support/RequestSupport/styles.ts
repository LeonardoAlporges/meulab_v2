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

export const RequirementsList = styled.View({
  marginTop: theme.spacing.md,
  marginBottom: theme.spacing.lg,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
});

export const RequirementItem = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.md,
});

export const RequirementIcon = styled(MaterialIcons)({
  fontSize: 20,
  color: theme.colors.primary,
  marginRight: theme.spacing.sm,
});

export const RequirementText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  flex: 1,
  lineHeight: 22,
});

export const ImportantNote = styled.View({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFF3CD",
  padding: theme.spacing.md,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#FFC107",
  marginBottom: theme.spacing.lg,
});

export const ImportantIcon = styled(MaterialIcons)({
  fontSize: 24,
  color: "#FF9800",
  marginRight: theme.spacing.sm,
});

export const ImportantText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: "#856404",
  flex: 1,
  lineHeight: 22,
});

export const CheckboxContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.md,
  padding: theme.spacing.md,
  backgroundColor: theme.colors.background,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
});

export const CheckboxText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  marginLeft: theme.spacing.sm,
  flex: 1,
});

