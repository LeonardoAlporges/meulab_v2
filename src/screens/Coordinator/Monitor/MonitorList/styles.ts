import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";

export const ButtonRow = styled.View({
  flexDirection: "row",
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.md,
});

export const ButtonWrapper = styled.View({
  flex: 1,
});

export const MonitorCard = styled.View({
  padding: theme.spacing.md,
  borderRadius: 12,
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.08)",
  marginBottom: theme.spacing.sm,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const MonitorInfo = styled.View({
  flex: 1,
  marginRight: theme.spacing.sm,
});

export const MonitorName = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: theme.colors.text,
});

export const ActionButton = styled.TouchableOpacity({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "rgba(20, 51, 89, 0.08)",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: theme.spacing.xs,
});

export const ActionIcon = styled(MaterialIcons)`
  font-size: 20px;
  color: ${theme.colors.primary};
`;

export const DeleteIcon = styled(MaterialIcons)`
  font-size: 20px;
  color: #c0392b;
`;

export const MonitorsContainer = styled.View({
  marginTop: 16,
});

export const EmptyContainer = styled.View({
  padding: 16,
  alignItems: "center",
});
