import React from "react";
import { TouchableOpacity } from "react-native";

import * as S from "./styles";

interface HeaderProps {
  title: string;
  onNavigation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onNavigation }) => {
  return (
    <S.Container>
      {onNavigation && (
        <TouchableOpacity onPress={onNavigation}>
          <S.BackIcon name="arrow-back" />
        </TouchableOpacity>
      )}
      <S.Title>{title}</S.Title>
      {!onNavigation && <S.Placeholder />}
    </S.Container>
  );
};
