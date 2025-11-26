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

export const IndicatorRow = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing.sm,
  marginBottom: theme.spacing.xs,
  paddingHorizontal: theme.spacing.md,
});

export const IndicatorDot = styled.View<{ active: boolean }>`
  width: ${(props) => (props.active ? 24 : 8)}px;
  height: ${(props) => (props.active ? 8 : 8)}px;
  border-radius: ${(props) => (props.active ? 4 : 999)}px;
  background-color: ${(props) =>
    props.active ? theme.colors.primary : "rgba(20, 51, 89, 0.2)"};
  margin-right: ${theme.spacing.xs}px;
`;