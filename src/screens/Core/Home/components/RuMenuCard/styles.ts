import styled from "@emotion/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { theme } from "@config/theme";

export const Container = styled.View({
  marginHorizontal: -theme.spacing.md,
});

export const PagerWrapper = styled.View`
  margin-bottom: ${theme.spacing.sm}px;
`;

export const Page = styled.View({
  padding: theme.spacing.md,
  borderRadius: 18,
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
  marginHorizontal: theme.spacing.md,
});

export const Header = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

export const FieldList = styled.View`
  gap: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const FieldRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
  align-items: center;
`;

export const FieldIconWrapper = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(20, 51, 89, 0.08);
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const FieldIcon = styled(MaterialCommunityIcons)`
  color: ${theme.colors.primary};
  font-size: 18px;
`;

export const FieldContent = styled.View`
  flex: 1;
`;

export const labelStyles = StyleSheet.create({
  headerTitle: {
    fontSize: theme.font.paragraph.md.fontSize,
    fontFamily: theme.font.paragraph.md2.fontFamily,
    color: theme.colors.text,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: theme.font.paragraph.sm.fontSize,
    fontFamily: theme.font.paragraph.sm.fontFamily,
    color: theme.colors.secondary,
  },
  fieldLabel: {
    fontSize: theme.font.paragraph.sm.fontSize,
    fontFamily: theme.font.paragraph.sm2.fontFamily,
    color: theme.colors.secondary,
  },
  fieldValue: {
    fontSize: theme.font.paragraph.md.fontSize,
    fontFamily: theme.font.paragraph.md.fontFamily,
    color: theme.colors.text,
  },
});
