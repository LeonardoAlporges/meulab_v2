import styled from "@emotion/native";
import { Image } from "react-native";

export const Container = styled.View`
  background-color: #143359;
  flex: 1;
  justify-content: space-evenly;
  padding: 16px;
`;

export const ContainerInput = styled.View``;

export const LogoImage = styled(Image)`
  width: 150px;
  height: 150px;
  align-self: center;
  margin-bottom: 16px;
`;

export const CardContainer = styled.View`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  margin-top: 48px;
`;

export const UfesImage = styled(Image)`
  width: 280px;
  height: 120px;
  align-self: center;
`;
