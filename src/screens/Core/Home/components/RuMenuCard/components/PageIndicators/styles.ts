import styled from "@emotion/native";

import { theme } from "@config/theme";

export const IndicatorRow = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing.sm,
  marginBottom: theme.spacing.xs,
  paddingHorizontal: theme.spacing.md,
});

export const IndicatorDot = styled.View<{ active?: boolean }>((props) => ({
  width: props.active ? 24 : 8,
  height: 8,
  borderRadius: props.active ? 4 : 999,
  backgroundColor: props.active
    ? theme.colors.primary
    : "rgba(20, 51, 89, 0.2)",
  marginRight: theme.spacing.xs,
}));
