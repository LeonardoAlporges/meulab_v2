export interface RuMenuItem {
  name: string;
}

export type MealTypeNumber = 1 | 2 | 3;
export type MealType = "Café da manhã" | "Almoço" | "Jantar";

export interface BreakfastMeal {
  bread: string;
  complement: string;
  drink: string[];
  fruit: string;
}

export interface LunchDinnerMeal {
  entrada: RuMenuItem[];
  pratoProteico: string;
  option: string;
  sideDish: string;
  garnish: string;
  dessert: string;
  juice: string;
}

export type RuMealDetails = BreakfastMeal | LunchDinnerMeal;

export interface RuMeal {
  type: MealTypeNumber;
  date: string;
  weekday: string;
  meal: RuMealDetails;
}

export interface RuMenuResponse {
  date: string;
  count: number;
  menu: RuMeal[];
}
