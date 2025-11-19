import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

import { useInput } from "@components/Input/useInput";
import { theme } from "@config/theme";
import { Label } from "../Label/Label";
import {
  ErrorText,
  IconButton,
  InputContainer,
  InputWrapper,
  StyledInput,
} from "./styles";

interface InputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: string;
  multiline?: boolean;
  isMask?: boolean;
  maskType?: string;
  large?: boolean;
  disable?: boolean;
  lbLarge?: boolean;
  handleChangeText?: (text: string) => string;
  marginTop?: number;
}

export const Input: React.FC<InputProps> = ({
  control,
  name,
  label,
  error = "",
  multiline = false,
  isMask = false,
  maskType = "",
  large = true,
  disable = false,
  lbLarge,
  handleChangeText,
  value,
  placeholder,
  secureTextEntry,
  marginTop = 12,
  ...rest
}) => {
  const {
    handleTextChange,
    isPasswordField,
    showPassword,
    togglePasswordVisibility,
  } = useInput({
    handleChangeText,
    isMask,
    maskType,
    secureTextEntry,
  });

  return (
    <InputContainer marginTop={marginTop}>
      {label && (
        <Label
          text={label}
          typography="sm2"
          lbLarge={lbLarge}
          size={large ? "large" : "small"}
        />
      )}
      <Controller
        control={control}
        render={({ field: { onChange, value: fieldValue } }) => (
          <InputWrapper large={large}>
            <StyledInput
              large={large}
              hasError={error !== ""}
              hasIcon={isPasswordField}
              editable={!disable}
              multiline={multiline}
              secureTextEntry={isPasswordField && !showPassword}
              onChangeText={(text) => {
                const processedText = handleTextChange(text);
                onChange(processedText);
              }}
              value={fieldValue || value || ""}
              placeholder={placeholder}
              {...rest}
            />
            {isPasswordField && (
              <IconButton onPress={togglePasswordVisibility}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={theme.colors.secondary}
                />
              </IconButton>
            )}
          </InputWrapper>
        )}
        name={name}
      />
      {error !== "" && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};
