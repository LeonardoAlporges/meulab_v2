import styled from "@emotion/native";
import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { theme } from "@config/theme";

export type ButtonType = "PRIMARY" | "SECONDARY" | "TERTIARY";

export interface ButtonProps extends Omit<TouchableOpacityProps, "onPress"> {
  onPress: () => void;
  title: string;
  type?: ButtonType;
  marginTop?: number;
  loading?: boolean;
  disabled?: boolean;
}

const ButtonContainer = styled.TouchableOpacity<{
  type: ButtonType;
  disabled?: boolean;
}>`
  background-color: ${(props) => {
    if (props.disabled) return "#E0E0E0";
    switch (props.type) {
      case "PRIMARY":
        return theme.colors.primary;
      case "SECONDARY":
        return theme.colors.secondary;
      case "TERTIARY":
        return theme.colors.background;
      default:
        return theme.colors.primary;
    }
  }};
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: 10px;
  border-width: ${(props) => (props.type === "TERTIARY" ? "1px" : "0px")};
  border-color: ${(props) =>
    props.type === "TERTIARY" ? theme.colors.primary : "transparent"};
  align-items: center;
  justify-content: center;
  min-height: 54px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text<{ type: ButtonType; disabled?: boolean }>`
  color: ${(props) => {
    if (props.disabled) return "#A0A0A0";
    return props.type === "TERTIARY" ? theme.colors.primary : "#FFFFFF";
  }};
  font-size: ${theme.font.paragraph.md.fontSize}px;
  font-family: ${theme.font.paragraph.md2.fontFamily};
`;

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  type = "PRIMARY",
  marginTop = 16,
  style,
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <ButtonContainer
      type={type}
      onPress={onPress}
      style={[{ marginTop }, style]}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={type === "TERTIARY" ? theme.colors.primary : "#FFFFFF"}
        />
      ) : (
        <ButtonText type={type} disabled={disabled}>
          {title}
        </ButtonText>
      )}
    </ButtonContainer>
  );
};
