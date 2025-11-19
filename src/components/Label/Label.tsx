import React from "react";
import { Text, TextProps } from "react-native";

import { theme } from "@config/theme";

interface LabelProps extends TextProps {
  text: string;
  typography?: keyof typeof theme.font.paragraph | keyof typeof theme.font.heading;
  size?: "small" | "large";
  lbLarge?: boolean;
  marginTop?: number;
  marginBottom?: number;
}

export const Label: React.FC<LabelProps> = ({
  text,
  typography = "sm2",
  size = "large",
  lbLarge,
  marginTop,
  marginBottom,
  style,
  ...rest
}) => {
  const actualSize = lbLarge !== undefined ? (lbLarge ? "large" : "small") : size;
  
  const fontStyle = typography in theme.font.paragraph
    ? theme.font.paragraph[typography as keyof typeof theme.font.paragraph]
    : theme.font.heading[typography as keyof typeof theme.font.heading];

  const containerStyle = {
    fontSize: fontStyle.fontSize,
    fontFamily: fontStyle.fontFamily,
    width: actualSize === "small" ? "48%" : "100%",
    ...(marginTop !== undefined && { marginTop }),
    ...(marginBottom !== undefined && { marginBottom }),
  };

  return (
    <Text style={[containerStyle, style]} {...rest}>
      {text}
    </Text>
  );
};

