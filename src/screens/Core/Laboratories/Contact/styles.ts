import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";

export const ContentContainer = styled.View({
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.md,
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
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.sm,
});

export const EmailContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
  marginBottom: theme.spacing.md,
});

export const EmailIcon = styled(MaterialIcons)({
  fontSize: 24,
  color: theme.colors.primary,
  marginRight: theme.spacing.sm,
});

export const EmailText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "600",
  color: theme.colors.primary,
  flex: 1,
});

export const SectionDivider = styled.View({
  height: 1,
  backgroundColor: "rgba(20, 51, 89, 0.1)",
  marginVertical: theme.spacing.lg,
});

export const CoordinatorContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.sm,
});

export const CoordinatorIcon = styled(MaterialIcons)({
  fontSize: 24,
  color: theme.colors.primary,
  marginRight: theme.spacing.sm,
});

export const DepartmentText = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  fontStyle: "italic",
  marginTop: theme.spacing.xs,
  paddingLeft: 36,
});

