import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";

import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { monitorService } from "@services/monitorService";
import { MonitorSchedulesPublic } from "@services/monitorService/types";

// Mapeamento de dias da semana
const DAY_MAP: Record<number, keyof MonitorSchedulesPublic> = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
};

// Obter dia da semana atual (1 = Segunda, 2 = Terça, ..., 5 = Sexta)
const getCurrentDayOfWeek = (): number => {
  const today = new Date();
  const day = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

  // Converter para nosso formato (1 = Segunda, 5 = Sexta)
  // Se for domingo (0) ou sábado (6), retorna segunda (1)
  if (day === 0 || day === 6) {
    return 1; // Segunda-feira
  }

  return day; // Segunda = 1, Terça = 2, ..., Sexta = 5
};

export const useMonitorSchedulesLab = () => {
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { showModal } = useModal();

  const [schedules, setSchedules] = useState<MonitorSchedulesPublic | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<number>(getCurrentDayOfWeek());

  const getSchedules = useCallback(async () => {
    showLoading();
    try {
      const response = await monitorService.getPublicMonitorSchedules();
      if (response.isSuccess && response.value) {
        setSchedules(response.value);
      } else {
        setSchedules(null);
        if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao carregar horários",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setSchedules(null);
      showModal({
        description: "Erro ao carregar horários",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading, showModal]);

  useFocusEffect(
    useCallback(() => {
      getSchedules();
    }, [getSchedules])
  );

  // Horários do dia selecionado (memoizado para performance)
  const daySchedules = useMemo(() => {
    if (!schedules) return [];
    const dayKey = DAY_MAP[selectedDay];
    return schedules[dayKey] || [];
  }, [schedules, selectedDay]);

  // Agrupar horários por hora (pode ter múltiplos monitores no mesmo horário)
  const groupedSchedules = useMemo(() => {
    const grouped: Record<string, typeof daySchedules> = {};
    daySchedules.forEach((item) => {
      if (!grouped[item.hour]) {
        grouped[item.hour] = [];
      }
      grouped[item.hour].push(item);
    });
    return grouped;
  }, [daySchedules]);

  // Ordenar horários
  const sortedHours = useMemo(() => {
    return Object.keys(groupedSchedules).sort((a, b) => {
      const hourA = parseInt(a.split(":")[0]);
      const hourB = parseInt(b.split(":")[0]);
      return hourA - hourB;
    });
  }, [groupedSchedules]);

  // Estatísticas do dia selecionado
  const dayStats = useMemo(() => {
    const hoursWithMonitor = sortedHours.filter((hour) => {
      const items = groupedSchedules[hour];
      return items.some((item) => item.status !== "available" && item.username);
    }).length;

    const hoursAvailable = sortedHours.filter((hour) => {
      const items = groupedSchedules[hour];
      return items.some((item) => item.status === "available");
    }).length;

    const uniqueMonitors = new Set<string>();
    daySchedules.forEach((item) => {
      if (item.username && item.status !== "available") {
        uniqueMonitors.add(item.username);
      }
    });

    return {
      totalHours: sortedHours.length,
      hoursWithMonitor,
      hoursAvailable,
      uniqueMonitorsCount: uniqueMonitors.size,
    };
  }, [sortedHours, groupedSchedules, daySchedules]);

  // Calcular maior intervalo contínuo com monitor
  const longestInterval = useMemo(() => {
    if (sortedHours.length === 0) return null;

    // Converter horários para números e filtrar apenas os que têm monitor
    const hoursWithMonitor = sortedHours
      .map((hour) => {
        const hourNum = parseInt(hour.split(":")[0]);
        const items = groupedSchedules[hour];
        const hasMonitor = items.some(
          (item) => item.status !== "available" && item.username
        );
        return { hour, hourNum, hasMonitor };
      })
      .filter((item) => item.hasMonitor);

    if (hoursWithMonitor.length === 0) return null;

    // Encontrar sequências consecutivas
    let longestStart = hoursWithMonitor[0].hour;
    let longestEnd = hoursWithMonitor[0].hour;
    let longestDuration = 1;

    let currentStart = hoursWithMonitor[0].hour;
    let currentEnd = hoursWithMonitor[0].hour;
    let currentDuration = 1;

    for (let i = 1; i < hoursWithMonitor.length; i++) {
      const prevHour = hoursWithMonitor[i - 1].hourNum;
      const currHour = hoursWithMonitor[i].hourNum;

      // Se é consecutivo (diferença de 1 hora)
      if (currHour === prevHour + 1) {
        currentEnd = hoursWithMonitor[i].hour;
        currentDuration++;
      } else {
        // Nova sequência
        if (currentDuration > longestDuration) {
          longestStart = currentStart;
          longestEnd = currentEnd;
          longestDuration = currentDuration;
        }
        currentStart = hoursWithMonitor[i].hour;
        currentEnd = hoursWithMonitor[i].hour;
        currentDuration = 1;
      }
    }

    // Verificar última sequência
    if (currentDuration > longestDuration) {
      longestStart = currentStart;
      longestEnd = currentEnd;
      longestDuration = currentDuration;
    }

    // Calcular horário final (adicionar 1 hora ao último horário)
    const endHourNum = parseInt(longestEnd.split(":")[0]);
    const endHourFormatted = `${(endHourNum + 1).toString().padStart(2, "0")}:00`;

    return {
      start: longestStart,
      end: endHourFormatted,
      duration: longestDuration,
    };
  }, [sortedHours, groupedSchedules]);

  return {
    schedules,
    selectedDay,
    setSelectedDay,
    daySchedules,
    groupedSchedules,
    sortedHours,
    dayStats,
    longestInterval,
    isLoading,
    getSchedules,
  };
};
