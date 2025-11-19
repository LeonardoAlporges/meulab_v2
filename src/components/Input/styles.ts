import styled from "@emotion/native";

import { theme } from "@config/theme";

export const InputContainer = styled.View<{ marginTop: number }>`
  margin-top: ${(props) => props.marginTop}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const InputWrapper = styled.View<{ large: boolean }>`
  position: relative;
  width: ${(props) => (props.large ? "100%" : "48%")};
  margin-top: 4px;
`;

export const StyledInput = styled.TextInput<{
  large: boolean;
  hasError: boolean;
  hasIcon: boolean;
}>`
  background-color: #FFFFFF;
  border-width: 1px;
  border-color: ${(props) => (props.hasError ? theme.colors.error : "#CCCCCC")};
  border-radius: 8px;
  padding-horizontal: 12px;
  padding-right: ${(props) => (props.hasIcon ? 48 : theme.spacing.md)}px;
  font-size: ${theme.font.paragraph.md.fontSize}px;
  width: 100%;
  min-height: 52px;
`;

export const IconButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16px;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  font-size: 10px;
  margin-top: 4px;
  padding-left: ${theme.spacing.sm}px;
`;
