import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { theme } from "@config/theme";

export const Container = styled.View({
  height: 100,
  backgroundColor: theme.colors.primary,
  paddingHorizontal: theme.spacing.md,
  paddingTop: 16,
  paddingBottom: 8,
  justifyContent: "center",
  marginHorizontal: -theme.spacing.md,
  marginBottom: theme.spacing.lg,
  borderBottomLeftRadius: 18,
  borderBottomRightRadius: 18,
});

export const ContentRow = styled.View({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
});

export const MenuIcon = styled(MaterialIcons)`
  font-size: 28px;
  color: ${theme.colors.background};
  margin-right: ${theme.spacing.md}px;
`;

export const UserInfo = styled.View({
  flex: 1,
  justifyContent: "center",
  marginLeft: 12,
});

export const NotificationIcon = styled(MaterialIcons)`
  font-size: 28px;
  color: ${theme.colors.background};
`;

export const labelStyles = StyleSheet.create({
  greeting: {
    color: theme.colors.background,
    marginBottom: theme.spacing.xs / 2,
  },
  info: {
    color: theme.colors.background,
    opacity: 0.9,
    marginTop: theme.spacing.xs / 2,
  },
});

