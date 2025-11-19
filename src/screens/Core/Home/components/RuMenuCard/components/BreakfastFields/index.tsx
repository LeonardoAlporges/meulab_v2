import React from "react";

import { Label } from "@components/index";

import { BreakfastMeal } from "@services/ruService/type";

import * as S from "../../styles";

interface BreakfastFieldsProps {
  meal: BreakfastMeal;
}

export const BreakfastFields: React.FC<BreakfastFieldsProps> = ({ meal }) => {
  return (
    <>
      {meal.bread && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="food" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Pão" style={S.labelStyles.fieldLabel} />
            <Label text={meal.bread} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.complement && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="food-variant" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Complemento" style={S.labelStyles.fieldLabel} />
            <Label text={meal.complement} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.drink && meal.drink.length > 0 && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="cup-water" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Bebidas" style={S.labelStyles.fieldLabel} />
            <Label text={meal.drink.join(", ")} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.fruit && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="food-apple" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Fruta" style={S.labelStyles.fieldLabel} />
            <Label text={meal.fruit} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
    </>
  );
};

