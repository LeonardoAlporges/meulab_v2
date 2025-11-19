import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";

export const Container = styled.View({
  height: 60,
  backgroundColor: theme.colors.primary,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BackIcon = styled(MaterialIcons)`
  font-size: 24px;
  color: ${theme.colors.background};
`;

export const Title = styled.Text({
  flex: 1,
  marginLeft: theme.spacing.sm,
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: theme.colors.background,
});

export const Placeholder = styled.View({
  width: 24,
});

