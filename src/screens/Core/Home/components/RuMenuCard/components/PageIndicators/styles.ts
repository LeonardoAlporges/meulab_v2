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

export const IndicatorDot = styled.View<{ active: boolean }>`
  width: ${(props) => (props.active ? 28 : 10)}px;
  height: 10px;
  border-radius: 999px;
  background-color: ${(props) =>
    props.active ? theme.colors.primary : "rgba(20, 51, 89, 0.3)"};
  margin-right: ${theme.spacing.xs}px;
`;

