import React from "react";
import { ScrollView } from "react-native";

import { Label } from "@components/index";
import { theme } from "@config/theme";

import { QuickAccessItem } from "../../quickAccessItems";
import * as S from "./styles";

interface QuickAccessCarouselProps {
  items: QuickAccessItem[];
}

export const QuickAccessCarousel: React.FC<QuickAccessCarouselProps> = ({
  items,
}) => {
  return (
    <>
      <Label text="Acesso rápido" marginBottom={theme.spacing.sm} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={S.carouselContent}
      >
        {items.map((item) => (
          <S.QuickAccessButton key={item.title} onPress={item.onPress}>
            <S.IconContainer>
              <S.QuickAccessIcon name={item.icon as any} />
            </S.IconContainer>
            <S.TextContainer>
              <Label
                text={item.title}
                style={S.quickAccessLabel}
                numberOfLines={2}
              />
            </S.TextContainer>
          </S.QuickAccessButton>
        ))}
      </ScrollView>
    </>
  );
};
