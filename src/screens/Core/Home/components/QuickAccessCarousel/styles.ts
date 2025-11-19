import styled from "@emotion/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";

export const carouselContent = {
  paddingRight: theme.spacing.md,
  gap: theme.spacing.sm,
};

export const QuickAccessButton = styled.TouchableOpacity({
  width: 120,
  height: 120,
  borderRadius: 16,
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.08)",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing.xs,
  flexDirection: "column",
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 1,
  marginRight: theme.spacing.sm,
});

export const IconContainer = styled.View({
  height: "40%",
  width: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const QuickAccessIcon = styled(MaterialCommunityIcons)<{
  name: string;
}>`
  font-size: 28px;
  color: ${theme.colors.primary};
`;

export const TextContainer = styled.View({
  height: "60%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const quickAccessLabel = {
  textAlign: "center" as const,
  color: theme.colors.text,
};
