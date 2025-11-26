import styled from "@emotion/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";

export const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${theme.spacing.xs}px;
  padding-bottom: ${theme.spacing.xs}px;
`;

export const ServiceButton = styled.TouchableOpacity`
  width: 48%;
  height: 100px;
  border-radius: 16px;
  background-color: ${theme.colors.background};
  border-width: 1px;
  border-color: rgba(20, 51, 89, 0.08);
  align-items: center;
  justify-content: flex-start;
  padding: ${theme.spacing.sm}px;
  flex-direction: column;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 1;
  margin-bottom: 12px;
`;

export const IconContainer = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const ServiceIcon = styled(MaterialCommunityIcons)`
  font-size: 32px;
  color: ${theme.colors.primary};
`;

export const TextContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const serviceLabel = {
  textAlign: "center" as const,
  color: theme.colors.text,
  fontSize: 12,
};
