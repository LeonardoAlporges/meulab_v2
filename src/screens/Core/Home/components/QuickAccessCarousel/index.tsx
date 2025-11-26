import React, { useCallback, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, layoutMeasurement } = event.nativeEvent;
      if (!layoutMeasurement?.width) return;

      const index = Math.round(contentOffset.x / layoutMeasurement.width);
      setCurrentIndex(index);
    },
    []
  );

  // Mostra indicadores apenas se houver mais de 1 item
  const showIndicators = items.length > 1;

  return (
    <>
      <Label text="Acesso rápido" marginBottom={theme.spacing.sm} />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={S.carouselContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled={false}
        snapToInterval={128} // width (120) + marginRight (sm = 8) = 128
        decelerationRate="fast"
        snapToAlignment="start"
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
