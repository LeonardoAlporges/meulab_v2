import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { theme } from "@config/theme";

export const Container = styled.View`
  flex: 1;
  padding: 0 ${theme.spacing.sm}px ${theme.spacing.sm}px ${theme.spacing.sm}px;
`;

export const ViewUser = styled.View`
  width: 100%;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const UserRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserIcon = styled(MaterialIcons)`
  font-size: 42px;
  color: ${theme.colors.background};
  margin-right: ${theme.spacing.sm}px;
`;

export const UserInfo = styled.View({
  flex: 1,
  marginLeft: theme.spacing.sm,
  justifyContent: "space-around",
});

export const Separator = styled.View({
  width: "100%",
  height: 1,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  marginTop: theme.spacing.sm,
  marginBottom: theme.spacing.md,
});

export const SignatureContainer = styled.View({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.md,
  paddingHorizontal: theme.spacing.sm,
  borderTopWidth: 1,
  borderTopColor: "rgba(255, 255, 255, 0.2)",
  alignItems: "center",
  backgroundColor: "#143359",
});

export const signatureStyles = StyleSheet.create({
  text: {
    color: theme.colors.background,
    opacity: 0.8,
    textAlign: "center",
    marginTop: theme.spacing.xs / 2,
  },
  email: {
    color: theme.colors.background,
    opacity: 0.8,
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },
});
