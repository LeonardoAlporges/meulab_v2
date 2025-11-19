import styled from "@emotion/native";

import { theme } from "@config/theme";

export const SelectContainer = styled.View<{ marginTop: number }>(
  ({ marginTop }) => ({
    marginTop,
  })
);

export const SelectWrapper = styled.View({
  position: "relative",
  zIndex: 1,
});

export const SelectDropdown = styled.View<{
  hasError?: boolean;
  large?: boolean;
  isOpen?: boolean;
}>(({ hasError, large, isOpen }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderColor: hasError ? "#FF3B30" : "rgba(20, 51, 89, 0.2)",
  borderRadius: 10,
  paddingHorizontal: large ? theme.spacing.md : theme.spacing.sm,
  paddingVertical: large ? theme.spacing.md : theme.spacing.sm,
  minHeight: large ? 54 : 44,
  ...(isOpen && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  }),
}));

export const SelectText = styled.Text<{
  hasValue: boolean;
  large?: boolean;
  hasError?: boolean;
}>(({ hasValue, large, hasError }) => ({
  fontSize: large
    ? theme.font.paragraph.md.fontSize
    : theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: hasValue ? theme.colors.text : "#999",
  flex: 1,
}));

export const SelectItem = styled.TouchableOpacity<{ active: boolean }>(
  ({ active }) => ({
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: active ? "rgba(20, 51, 89, 0.05)" : "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(20, 51, 89, 0.1)",
  })
);

export const SelectItemText = styled.Text<{ active: boolean }>(({ active }) => ({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: active ? theme.colors.primary : theme.colors.text,
  fontWeight: active ? "600" : "400",
}));

export const SelectOptionsList = styled.View({
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderTopWidth: 0,
  borderColor: "rgba(20, 51, 89, 0.2)",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  maxHeight: 200,
  overflow: "hidden",
});

export const ErrorText = styled.Text({
  fontSize: 12,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: "#FF3B30",
  marginTop: theme.spacing.xs,
  marginLeft: theme.spacing.xs,
});

