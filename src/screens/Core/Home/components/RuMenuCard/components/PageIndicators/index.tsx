import React from "react";

import { RuMeal } from "@services/ruService/type";

import * as S from "./styles";

interface PageIndicatorsProps {
  meals: RuMeal[];
  currentIndex: number;
}

export const PageIndicators: React.FC<PageIndicatorsProps> = ({
  meals,
  currentIndex,
}) => {
  if (meals.length <= 1) {
    return null;
  }

  return (
    <S.IndicatorRow>
      {meals.map((meal, index) => (
        <S.IndicatorDot
          key={`${meal.type}-${meal.date}`}
          active={index === currentIndex}
          style={index === meals.length - 1 ? { marginRight: 0 } : {}}
        />
      ))}
    </S.IndicatorRow>
  );
};

