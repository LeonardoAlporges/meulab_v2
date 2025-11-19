import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { ScrollView, TouchableOpacity } from "react-native";

import { theme } from "@config/theme";
import { Label } from "../Label/Label";
import * as S from "./styles";

export interface SelectOption {
  label: string;
  value: number | string;
}

interface SelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  options: SelectOption[];
  large?: boolean;
  marginTop?: number;
}

export const Select: React.FC<SelectProps> = ({
  control,
  name,
  label,
  placeholder = "Selecione",
  error = "",
  options,
  large = true,
  marginTop = 12,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.SelectContainer marginTop={marginTop}>
      {label && (
        <Label
          text={label}
          typography="sm2"
          size={large ? "large" : "small"}
        />
      )}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = options.find((opt) => opt.value === value);
          const displayText = selectedOption ? selectedOption.label : placeholder;

          return (
            <S.SelectWrapper>
              <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.7}
              >
                <S.SelectDropdown hasError={error !== ""} large={large} isOpen={isOpen}>
                  <S.SelectText
                    hasValue={!!selectedOption}
                    large={large}
                    hasError={error !== ""}
                  >
                    {displayText}
                  </S.SelectText>
                  <MaterialIcons
                    name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color={theme.colors.text}
                  />
                </S.SelectDropdown>
              </TouchableOpacity>

              {isOpen && (
                <S.SelectOptionsList>
                  <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    style={{ maxHeight: 200 }}
                  >
                    {options.map((option) => (
                      <S.SelectItem
                        key={option.value}
                        onPress={() => {
                          onChange(option.value);
                          setIsOpen(false);
                        }}
                        active={value === option.value}
                      >
                        <S.SelectItemText active={value === option.value}>
                          {option.label}
                        </S.SelectItemText>
                      </S.SelectItem>
                    ))}
                  </ScrollView>
                </S.SelectOptionsList>
              )}
            </S.SelectWrapper>
          );
        }}
        name={name}
      />
      {error !== "" && <S.ErrorText>{error}</S.ErrorText>}
    </S.SelectContainer>
  );
};

