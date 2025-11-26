import styled from "@emotion/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.primary};
  border-radius: 20px;
  
  padding: ${theme.spacing.lg}px;
  margin-vertical: ${theme.spacing.sm}px;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 5;
  margin-bottom:16px;
`;

export const IconWrapper = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  font-size: 32px;
  color: #ffffff;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const titleStyle = {
  color: "#FFFFFF",
  marginBottom: theme.spacing.xs,
};

export const Subtitle = styled.Text`
  font-size: 12px;
  font-family: ${theme.font.paragraph.sm.fontFamily};
  color: rgba(255, 255, 255, 0.8);
`;

export const ArrowIcon = styled(MaterialCommunityIcons)`
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
`;

