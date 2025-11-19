import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

import { lessonSchedule } from "./data";

const STORAGE_KEY = "@lesson_schedule_period";

export const useLessonSchedule = () => {
  const [activePeriodId, setActivePeriodId] = useState(
    lessonSchedule[0]?.id ?? ""
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredPeriod = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const exists = lessonSchedule.some((period) => period.id === stored);
          if (exists) {
            setActivePeriodId(stored);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredPeriod();
  }, []);

  const handleSelectPeriod = useCallback(async (periodId: string) => {
    setActivePeriodId(periodId);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, periodId);
    } catch (error) {
      console.error("Erro ao salvar período selecionado:", error);
    }
  }, []);

  const activePeriod = lessonSchedule.find(
    (period) => period.id === activePeriodId
  );

  return {
    lessonSchedule,
    activePeriodId,
    activePeriod,
    isLoading,
    handleSelectPeriod,
  };
};

