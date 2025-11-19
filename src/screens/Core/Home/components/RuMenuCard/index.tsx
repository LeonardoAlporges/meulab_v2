import React from "react";
import { ScrollView } from "react-native";

import { Label } from "@components/index";
import { theme } from "@config/theme";

import { ErrorCard } from "./components/ErrorCard";
import { MealPage } from "./components/MealPage";
import { PageIndicators } from "./components/PageIndicators";
import { SkeletonLoader } from "./components/SkeletonLoader";
import * as S from "./styles";
import { useRuMenuCard } from "./useRuMenuCard";

export const RuMenuCard: React.FC = () => {
  const {
    loading,
    errorMessage,
    availableMeals,
    pageIndex,
    pageWidth,
    handleMomentumScrollEnd,
    handleLayout,
  } = useRuMenuCard();

  if (loading) {
    return <SkeletonLoader />;
  }

  if (errorMessage) {
    return <ErrorCard />;
  }

  if (!availableMeals.length) {
    return null;
  }

  return (
    <>
      <Label
        text="Cardápio Restaurante universitário"
        marginTop={theme.spacing.lg}
        marginBottom={theme.spacing.sm}
      />
      <S.Container>
        <S.PagerWrapper onLayout={handleLayout}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            contentContainerStyle={{ alignItems: "flex-start" }}
          >
            {availableMeals.map((meal) => (
              <MealPage key={meal.type} meal={meal} pageWidth={pageWidth} />
            ))}
          </ScrollView>
        </S.PagerWrapper>
      </S.Container>

      <PageIndicators meals={availableMeals} currentIndex={pageIndex} />
    </>
  );
};
