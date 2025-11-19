import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { monitorService } from "@services/monitorService";
import { MonitorSchedules } from "@services/monitorService/types";

// Mapeamento de dias da semana
const DAY_MAP: Record<number, keyof MonitorSchedules> = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
};

// Inicializar todos os dias com arrays vazios
const getEmptyHours = () => ({
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
});

// Extrair horários de um dia específico
const extractHours = (
  schedules: MonitorSchedules | null,
  day: number
): number[] => {
  if (!schedules) return [];
  const dayKey = DAY_MAP[day];
  return schedules[dayKey]?.map((item) => item.hour) || [];
};

export const useMonitorSchedules = () => {
  const route = useRoute();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { showModal, hideModal } = useModal();

  const { monitorId } = (route.params as { monitorId?: number }) || {};
  const [schedules, setSchedules] = useState<MonitorSchedules | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [editedHours, setEditedHours] =
    useState<Record<number, number[]>>(getEmptyHours);

  // Horários originais carregados da API
  const originalHours = useMemo(() => {
    const hours: Record<number, number[]> = getEmptyHours();
    [1, 2, 3, 4, 5].forEach((day) => {
      hours[day] = extractHours(schedules, day);
    });
    return hours;
  }, [schedules]);

  // Verificar se há mudanças
  const hasChanges = useMemo(() => {
    return [1, 2, 3, 4, 5].some((day) => {
      const original = originalHours[day].sort().join(",");
      const edited = (editedHours[day] || []).sort().join(",");
      return original !== edited;
    });
  }, [originalHours, editedHours]);

  const getSchedules = useCallback(async () => {
    if (!monitorId) return;

    showLoading();
    try {
      const response = await monitorService.getMonitorSchedules(monitorId);
      if (response.isSuccess && response.value) {
        setSchedules(response.value);
        // Inicializar editedHours com os horários carregados
        const initialHours: Record<number, number[]> = getEmptyHours();
        [1, 2, 3, 4, 5].forEach((day) => {
          initialHours[day] = extractHours(response.value, day);
        });
        setEditedHours(initialHours);
      } else {
        setSchedules(null);
        setEditedHours(getEmptyHours());
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
      setEditedHours(getEmptyHours());
      showModal({
        description: "Erro ao carregar horários",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [monitorId, showLoading, hideLoading, showModal]);

  useEffect(() => {
    getSchedules();
  }, [getSchedules]);

  const getHoursForDay = useCallback(
    (day: number): number[] => editedHours[day] || [],
    [editedHours]
  );

  const toggleHour = useCallback((day: number, hourId: number) => {
    setEditedHours((prev) => {
      const currentHours = prev[day] || [];
      const isSelected = currentHours.includes(hourId);
      const newHours = isSelected
        ? currentHours.filter((h) => h !== hourId)
        : [...currentHours, hourId].sort((a, b) => a - b);
      return { ...prev, [day]: newHours };
    });
  }, []);

  const saveSchedule = useCallback(async () => {
    if (!monitorId) return;

    const payload = {
      mondayHours: editedHours[1]?.length ? editedHours[1] : undefined,
      tuesdayHours: editedHours[2]?.length ? editedHours[2] : undefined,
      wednesdayHours: editedHours[3]?.length ? editedHours[3] : undefined,
      thursdayHours: editedHours[4]?.length ? editedHours[4] : undefined,
      fridayHours: editedHours[5]?.length ? editedHours[5] : undefined,
    };

    const executeSaveWithOverlap = async () => {
      hideModal();
      showLoading();
      try {
        const response = await monitorService.updateMonitorScheduleWithOverlap(
          monitorId,
          payload
        );

        if (response.isSuccess) {
          showModal({
            description: "Horários atualizados com sucesso",
            type: "success",
          });
          await getSchedules();
        } else if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao salvar horários",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao salvar horários",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    };

    showLoading();
    try {
      const response = await monitorService.updateMonitorSchedule(
        monitorId,
        payload
      );

      // Verificar se é status 203 (conflito de horários)
      if (response.status === 203) {
        hideLoading();
        showModal({
          title: "Conflito de horários",
          description:
            response.value?.errorMessage ||
            (typeof response.value === "string"
              ? response.value
              : "Existe um conflito de horários. Deseja continuar mesmo assim?"),
          type: "alert",
          buttons: [
            {
              title: "Não",
              type: "PRIMARY",
              onPress: hideModal,
            },
            {
              title: "Sim",
              type: "TERTIARY",
              onPress: () => {
                executeSaveWithOverlap();
              },
            },
          ],
        });
      } else if (response.isSuccess) {
        showModal({
          description: "Horários atualizados com sucesso",
          type: "success",
        });
        await getSchedules();
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao salvar horários",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao salvar horários",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [
    monitorId,
    editedHours,
    showLoading,
    hideLoading,
    showModal,
    hideModal,
    getSchedules,
  ]);

  const formatHour = useCallback(
    (hourId: number): string =>
      `${(hourId + 7).toString().padStart(2, "0")}:00`,
    []
  );

  return {
    selectedDay,
    setSelectedDay,
    getHoursForDay,
    formatHour,
    isLoading,
    toggleHour,
    saveSchedule,
    hasChanges,
  };
};
