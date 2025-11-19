import React from "react";

import { Label } from "@components/index";

import {
  BreakfastMeal,
  LunchDinnerMeal,
  RuMeal,
} from "@services/ruService/type";

import { theme } from "@config/theme";

import * as S from "../../styles";
import { formatDateLabel, getMealTypeLabel, isBreakfast } from "../../utils";
import { BreakfastFields } from "../BreakfastFields";
import { LunchDinnerFields } from "../LunchDinnerFields";

interface MealPageProps {
  meal: RuMeal;
  pageWidth: number;
}

export const MealPage: React.FC<MealPageProps> = ({ meal, pageWidth }) => {
  const formattedLabels = formatDateLabel(meal);
  const mealTypeLabel = getMealTypeLabel(meal.type);
  const isBreakfastMeal = isBreakfast(meal.meal);
  const breakfastMeal = isBreakfastMeal ? (meal.meal as BreakfastMeal) : null;
  const lunchDinnerMeal = !isBreakfastMeal
    ? (meal.meal as LunchDinnerMeal)
    : null;

  const cardWidth = pageWidth ? pageWidth - theme.spacing.md * 2 : "100%";

  return (
    <S.Page style={{ width: cardWidth }}>
      <S.Header>
        <Label text={mealTypeLabel} style={S.labelStyles.headerTitle} />
        <Label
          text={`${formattedLabels.weekday} - ${formattedLabels.dateLabel}`}
          style={S.labelStyles.headerSubtitle}
        />
      </S.Header>

      <S.FieldList>
        {isBreakfastMeal && breakfastMeal ? (
          <BreakfastFields meal={breakfastMeal} />
        ) : (
          lunchDinnerMeal && <LunchDinnerFields meal={lunchDinnerMeal} />
        )}
      </S.FieldList>
    </S.Page>
  );
};
