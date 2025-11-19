import { useCallback, useEffect, useMemo, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { format } from "date-fns";

import { ruService } from "@services/ruService";
import { RuMeal } from "@services/ruService/type";

import { sortMealsByOrder } from "./utils";

export const useRuMenuCard = () => {
  const [meals, setMeals] = useState<RuMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const response = await ruService.getRuMenu(today);

      if (response.isSuccess && response.value?.menu?.length) {
        setMeals(response.value.menu);
        setErrorMessage(null);
      } else {
        setMeals([]);
        setErrorMessage("Não foi possível obter dados do cardápio do dia.");
      }
    } catch (error) {
      console.error(error);
      setMeals([]);
      setErrorMessage("Não foi possível obter dados do cardápio do dia.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const availableMeals = useMemo(() => sortMealsByOrder(meals), [meals]);

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
    handleMomentumScrollEnd,
    handleLayout,
  };
};

