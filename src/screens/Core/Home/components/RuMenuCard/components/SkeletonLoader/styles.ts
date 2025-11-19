import styled from "@emotion/native";

import { theme } from "@config/theme";

export const SkeletonCard = styled.View({
  marginTop: theme.spacing.lg,
  padding: theme.spacing.md,
  borderRadius: 18,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.05)",
});

export const SkeletonBlock = styled.View({
  height: 16,
  borderRadius: 8,
  marginVertical: theme.spacing.xs,
  backgroundColor: "rgba(20, 51, 89, 0.1)",
});

