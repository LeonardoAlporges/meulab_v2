import styled from "@emotion/native";

import { theme } from "@config/theme";

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #00000080;
`;

export const Container = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 16px;
  padding: 16px;
  align-items: center;
  min-height: 300px;
  justify-content: space-evenly;
`;

export const IconWrapper = styled.View<{ bgColor: string }>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor}20;
`;

export const Title = styled.Text`
  margin-top: ${theme.spacing.md}px;
  text-align: center;
  color: ${theme.colors.text};
  font-size: 24px;
  font-family: ${theme.font.heading.lg.fontFamily};
`;

export const Description = styled.Text`
  margin-top: ${theme.spacing.sm}px;
  text-align: center;
  color: ${theme.colors.secondary};
  font-size: 16px;
  font-family: ${theme.font.paragraph.md.fontFamily};
`;

export const ButtonsWrapper = styled.View`
  width: 100%;
  margin-top: ${theme.spacing.lg}px;
`;
