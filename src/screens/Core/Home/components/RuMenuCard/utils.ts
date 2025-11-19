import { format } from "date-fns";

import {
  BreakfastMeal,
  MealTypeNumber,
  RuMeal,
} from "@services/ruService/type";

export const getMealTypeLabel = (type: MealTypeNumber): string => {
  switch (type) {
    case 1:
      return "Café da manhã";
    case 2:
      return "Almoço";
    case 3:
      return "Jantar";
    default:
      return "Refeição";
  }
};

export const isBreakfast = (meal: RuMeal["meal"]): meal is BreakfastMeal => {
  return "bread" in meal;
};

export const formatDateLabel = (meal?: RuMeal) => {
  if (!meal) return { weekday: "--", dateLabel: "--/--" };

  try {
    const parsedDate = meal.date ? new Date(meal.date) : null;
    const formattedDate = parsedDate ? format(parsedDate, "dd/MM") : "";
    return {
      weekday: meal.weekday ?? "Dia não informado",
      dateLabel: formattedDate || meal.date || "--/--",
    };
  } catch {
    return {
      weekday: meal.weekday || "Dia não informado",
      dateLabel: meal.date || "--/--",
    };
  }
};

export const MEAL_ORDER: MealTypeNumber[] = [1, 2, 3];

export const sortMealsByOrder = (meals: RuMeal[]): RuMeal[] => {
  return [...meals].sort((a, b) => {
    const indexA = MEAL_ORDER.indexOf(a.type);
    const indexB = MEAL_ORDER.indexOf(b.type);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

