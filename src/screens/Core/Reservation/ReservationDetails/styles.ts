import styled from "@emotion/native";

import { theme } from "@config/theme";

export const Section = styled.View({
  width: "100%",
  marginBottom: theme.spacing.md,
});

export const SectionTitle = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
  fontWeight: "600",
});

export const SectionValue = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  marginTop: theme.spacing.xs,
});

export const StatusContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.md,
});

export const StatusBadge = styled.View<{ background: string; border: string }>(
  ({ background, border }) => ({
    backgroundColor: background,
    borderColor: border,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  })
);

export const StatusText = styled.Text<{ color: string }>(({ color }) => ({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color,
  fontWeight: "700",
  marginLeft: theme.spacing.sm,
}));

export const ButtonGroup = styled.View({
  width: "100%",
  marginTop: theme.spacing.md,
});

export const ActionButton = styled.TouchableOpacity<{
  background: string;
}>(({ background }) => ({
  backgroundColor: background,
  borderRadius: 10,
  paddingVertical: theme.spacing.md,
  paddingHorizontal: theme.spacing.lg,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing.sm,
}));

export const ActionButtonText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: "#FFFFFF",
  fontWeight: "600",
});

