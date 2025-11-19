import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { occurrenceService } from "@services/occurrenceService";
import { Occurrence } from "@services/occurrenceService/types";

export const useOccurrenceRequests = () => {
  const { user } = useAuth();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { showModal } = useModal();

  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [empty, setEmpty] = useState(false);

  const getOccurrences = useCallback(async () => {
    if (!user) return;

    showLoading();
    try {
      let response;
      if (user.isCoordinator) {
        // Coordenador vê todas as ocorrências
        response = await occurrenceService.getAllOccurrences();
      } else if (user.idMonitor) {
        // Monitor vê apenas as suas
        response = await occurrenceService.getOccurrenceByIdMonitor(
          user.idMonitor
        );
      } else {
        setOccurrences([]);
        setEmpty(true);
        hideLoading();
        return;
      }

      if (response.isSuccess && response.value) {
        const occurrencesList = Array.isArray(response.value)
          ? response.value
          : [];
        setOccurrences(occurrencesList);
        setEmpty(occurrencesList.length === 0);
      } else {
        setOccurrences([]);
        setEmpty(true);
        if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao carregar ocorrências",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setOccurrences([]);
      setEmpty(true);
      showModal({
        description: "Erro ao carregar ocorrências",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [user, showLoading, hideLoading, showModal]);

  useFocusEffect(
    useCallback(() => {
      getOccurrences();
    }, [getOccurrences])
  );

  return {
    occurrences,
    empty,
    isLoading,
    getOccurrences,
  };
};

