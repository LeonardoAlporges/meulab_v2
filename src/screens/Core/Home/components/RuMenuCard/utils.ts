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
    let formattedDate = "";
    
    if (meal.date) {
      // Extrai a data diretamente da string ISO (yyyy-MM-dd) para evitar problemas de timezone
      // Exemplo: "2025-11-27T00:00:00+00:00" -> "27/11"
      const dateMatch = meal.date.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (dateMatch) {
        const [, , month, day] = dateMatch;
        formattedDate = `${day}/${month}`;
      } else {
        // Fallback: tenta fazer parse da data se o formato não for ISO
        const parsedDate = new Date(meal.date);
        if (!isNaN(parsedDate.getTime())) {
          formattedDate = format(parsedDate, "dd/MM");
        }
      }
    }

    return {
      weekday: meal.weekday ?? "Dia não informado",
      dateLabel: formattedDate || "--/--",
    };
  } catch {
    return {
      weekday: meal.weekday || "Dia não informado",
      dateLabel: "--/--",
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

/**
 * Determina qual refeição deve ser exibida baseado no horário atual
 * @returns {MealTypeNumber | null} O tipo da refeição a ser exibida (1=café, 2=almoço, 3=jantar) ou null
 */
export const getCurrentMealType = (): MealTypeNumber | null => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes; // tempo em minutos desde meia-noite

  // 20:01 (1201 minutos) até 08:30 (510 minutos do dia seguinte)
  // Se for depois das 20:01 ou antes das 08:30, mostra café da manhã
  if (currentTime >= 1201 || currentTime <= 510) {
    return 1; // Café da manhã
  }
  // 08:31 (511 minutos) até 13:30 (810 minutos)
  if (currentTime >= 511 && currentTime <= 810) {
    return 2; // Almoço
  }
  // 13:31 (811 minutos) até 20:00 (1200 minutos)
  if (currentTime >= 811 && currentTime <= 1200) {
    return 3; // Jantar
  }

  return null;
};

/**
 * Determina qual data usar para buscar o cardápio baseado no horário atual
 * Regra: Entre 20:01 e 23:59 mostra o dia seguinte, de 00:00 em diante mostra o dia atual
 * @returns {string} Data no formato yyyy-MM-dd
 */
export const getTargetDate = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  // Se for depois das 20:01 (20:01 até 23:59), busca o cardápio do dia seguinte
  if (currentTime >= 1201) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return format(tomorrow, "yyyy-MM-dd");
  }

  // De 00:00 em diante (até 20:00), usa a data atual
  return format(now, "yyyy-MM-dd");
};

/**
 * Extrai a data no formato yyyy-MM-dd de uma string ISO
 * @param dateString String de data (pode ser ISO ou yyyy-MM-dd)
 * @returns Data no formato yyyy-MM-dd
 */
const extractDateOnly = (dateString: string): string => {
  const match = dateString.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : dateString;
};

/**
 * Encontra o índice do card que deve ser exibido baseado no horário atual
 * @param meals Array de refeições ordenadas
 * @returns {number} Índice do card a ser exibido, ou 0 se não encontrar
 */
export const getInitialCardIndex = (meals: RuMeal[]): number => {
  const targetMealType = getCurrentMealType();
  if (!targetMealType) return 0;

  const targetDate = getTargetDate();
  
  // Procura o card que corresponde ao tipo e data
  // Normaliza as datas para comparar apenas a parte yyyy-MM-dd
  const index = meals.findIndex((meal) => {
    const mealDateOnly = extractDateOnly(meal.date);
    return meal.type === targetMealType && mealDateOnly === targetDate;
  });

  // Se não encontrar exatamente, procura pelo tipo apenas
  if (index === -1) {
    const typeIndex = meals.findIndex((meal) => meal.type === targetMealType);
    return typeIndex !== -1 ? typeIndex : 0;
  }

  return index;
};

