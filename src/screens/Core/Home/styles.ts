import styled from "@emotion/native";

import { theme } from "@config/theme";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f7f7f7;
`;

export const contentContainerStyle = {
  paddingHorizontal: theme.spacing.md,
  paddingBottom: theme.spacing.lg,
};
