import React from "react";
import { View } from "react-native";

import { theme } from "@config/theme";
import { RuMeal } from "@services/ruService/type";

interface PageIndicatorsProps {
  meals: RuMeal[];
  currentIndex: number;
}

export const PageIndicators: React.FC<PageIndicatorsProps> = ({
  meals,
  currentIndex,
}) => {
  // Sempre mostra os indicadores se houver refeições (sempre serão 3 cards)
  if (!meals || meals.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        minHeight: 20,
        width: "100%",
      }}
    >
      {meals.map((meal, index) => {
        // Usa uma chave única combinando id e index para garantir unicidade
        const uniqueKey = meal.id
          ? `indicator-${meal.id}`
          : `indicator-${index}`;
        const isActive = index === currentIndex;
        return (
          <View
            key={uniqueKey}
            style={{
              width: isActive ? 24 : 8,
              height: 8,
              borderRadius: isActive ? 4 : 999,
              backgroundColor: isActive
                ? theme.colors.primary
                : "rgba(20, 51, 89, 0.2)",
              marginRight: index === meals.length - 1 ? 0 : theme.spacing.xs,
            }}
          />
        );
      })}
    </View>
  );
};
