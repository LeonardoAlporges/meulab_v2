import styled from "@emotion/native";

import { theme } from "@config/theme";

export const Container = styled.View({
  flex: 1,
  backgroundColor: "#f7f7f7",
});

export const Content = styled.View({
  flex: 1,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.md,
});

export const ScrollContent = styled.View({
  flex: 1,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.md,
});

export const scrollContentStyle = {
  flexGrow: 1,
  paddingBottom: 100, // Espaço extra para evitar que o teclado cubra os campos
};

