import styled from "@emotion/native";

import { theme } from "@config/theme";

export const WebViewWrapper = styled.View({
  flex: 1,
  borderRadius: 12,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
  marginTop: theme.spacing.md,
});

export const WebViewLoading = styled.View({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255,255,255,0.85)",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
});

