import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import { ruService } from "@services/ruService";
import { MealTypeNumber, RuMeal } from "@services/ruService/type";

import { getInitialCardIndex, getTargetDate, sortMealsByOrder } from "./utils";

export const useRuMenuCard = () => {
  const [meals, setMeals] = useState<RuMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const scrollViewRef = useRef<any>(null);
  const hasScrolledToInitial = useRef(false);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // Determina qual data buscar baseado no horário atual
      // Entre 20:01 e 23:59: busca dia seguinte
      // De 00:00 em diante: busca dia atual
      const targetDate = getTargetDate();

      const response = await ruService.getRuMenu(targetDate);

      if (response.isSuccess && response.value?.menu?.length) {
        // Sempre mostra no máximo 3 cards (café, almoço, jantar) do mesmo dia
        // Remove duplicatas baseado no tipo, mantendo apenas um de cada tipo
        const mealsMap = new Map<MealTypeNumber, RuMeal>();
        response.value.menu.forEach((meal) => {
          // Se já existe um meal deste tipo, mantém o primeiro encontrado
          if (!mealsMap.has(meal.type)) {
            mealsMap.set(meal.type, meal);
          }
        });

        // Converte o Map de volta para array (máximo 3 itens)
        const uniqueMeals = Array.from(mealsMap.values());
        setMeals(uniqueMeals);
        setErrorMessage(null);
      } else {
        setMeals([]);
        setErrorMessage("Não foi possível obter dados do cardápio.");
      }
    } catch (error) {
      console.error(error);
      setMeals([]);
      setErrorMessage("Não foi possível obter dados do cardápio.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const availableMeals = useMemo(() => sortMealsByOrder(meals), [meals]);

  // Scroll automático para o card correto baseado no horário
  useEffect(() => {
    if (
      availableMeals.length > 0 &&
      pageWidth > 0 &&
      !hasScrolledToInitial.current &&
      scrollViewRef.current
    ) {
      const initialIndex = getInitialCardIndex(availableMeals);
      if (initialIndex >= 0 && initialIndex < availableMeals.length) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: initialIndex * pageWidth,
            animated: true,
          });
          setPageIndex(initialIndex);
          hasScrolledToInitial.current = true;
        }, 100);
      }
    }
  }, [availableMeals, pageWidth]);

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, layoutMeasurement } = event.nativeEvent;
      if (!layoutMeasurement?.width) return;
      const nextIndex = Math.round(contentOffset.x / layoutMeasurement.width);
      setPageIndex(nextIndex);
    },
    []
  );

  const handleLayout = useCallback((event: any) => {
    setPageWidth(event.nativeEvent.layout.width);
  }, []);

  return {
    loading,
    errorMessage,
    availableMeals,
    pageIndex,
    pageWidth,
    scrollViewRef,
    handleMomentumScrollEnd,
    handleLayout,
  };
};
