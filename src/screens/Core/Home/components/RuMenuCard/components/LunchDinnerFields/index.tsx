import React from "react";

import { Label } from "@components/index";

import { LunchDinnerMeal } from "@services/ruService/type";

import * as S from "../../styles";

interface LunchDinnerFieldsProps {
  meal: LunchDinnerMeal;
}

export const LunchDinnerFields: React.FC<LunchDinnerFieldsProps> = ({
  meal,
}) => {
  return (
    <>
      {meal.entrada && meal.entrada.length > 0 && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="food-variant" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Entrada" style={S.labelStyles.fieldLabel} />
            <Label
              text={meal.entrada.map((e) => e.name).join(", ")}
              style={S.labelStyles.fieldValue}
            />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.pratoProteico && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="food-steak" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Prato proteico" style={S.labelStyles.fieldLabel} />
            <Label text={meal.pratoProteico} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.option && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="food-variant" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Opção" style={S.labelStyles.fieldLabel} />
            <Label text={meal.option} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.sideDish && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="silverware-fork-knife" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Acompanhamento" style={S.labelStyles.fieldLabel} />
            <Label text={meal.sideDish} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.garnish && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="food-drumstick" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Guarnição" style={S.labelStyles.fieldLabel} />
            <Label text={meal.garnish} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.dessert && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="cupcake" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Sobremesa" style={S.labelStyles.fieldLabel} />
            <Label text={meal.dessert} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
      {meal.juice && (
        <S.FieldRow>
          <S.FieldIconWrapper>
            <S.FieldIcon name="cup-water" />
          </S.FieldIconWrapper>
          <S.FieldContent>
            <Label text="Suco" style={S.labelStyles.fieldLabel} />
            <Label text={meal.juice} style={S.labelStyles.fieldValue} />
          </S.FieldContent>
        </S.FieldRow>
      )}
    </>
  );
};

