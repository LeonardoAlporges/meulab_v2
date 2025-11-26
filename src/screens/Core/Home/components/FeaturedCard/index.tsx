import React from "react";

import { Label } from "@components/index";

import { QuickAccessItem } from "../../quickAccessItems";
import * as S from "./styles";

interface FeaturedCardProps {
  item: QuickAccessItem;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ item }) => {
  return (
    <S.Container onPress={item.onPress} activeOpacity={0.8}>
      <S.IconWrapper>
        <S.Icon name={item.icon as any} />
      </S.IconWrapper>
      <S.Content>
        <Label
          text={item.title}
          typography="md2"
          style={S.titleStyle}
          numberOfLines={2}
        />
        <S.Subtitle>Toque para acessar</S.Subtitle>
      </S.Content>
      <S.ArrowIcon name="chevron-right" />
    </S.Container>
  );
};
