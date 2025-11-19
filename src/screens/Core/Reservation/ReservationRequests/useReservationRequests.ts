import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { reservationService } from "@services/reservationService";
import { Reservation } from "@services/reservationService/types";
import { normalizeReservation } from "@utils/reservationMapper";

export const useReservationRequests = () => {
  const { user } = useAuth();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { showModal } = useModal();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [empty, setEmpty] = useState(false);

  const getReservations = useCallback(async () => {
    if (!user?.id && !user?.isCoordinator && !user?.isWatchman) {
      return;
    }

    showLoading();
    try {
      let response;
      if (user?.isCoordinator || user?.isWatchman) {
        response = await reservationService.getAllReservations();
      } else if (user?.id) {
        response = await reservationService.getReservationsByUser(user.id);
      } else {
        return;
      }

      if (response.isSuccess && Array.isArray(response.value)) {
        const normalized = response.value.map((item) =>
          normalizeReservation(item)
        );
        setReservations(normalized);
        setEmpty(normalized.length === 0);
      } else {
        setReservations([]);
        setEmpty(true);
        if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao carregar reservas",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setReservations([]);
      setEmpty(true);
      showModal({
        description: "Erro ao carregar reservas",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [user, showLoading, hideLoading, showModal]);

  useFocusEffect(
    useCallback(() => {
      getReservations();
    }, [getReservations])
  );

  return {
    reservations,
    empty,
    isLoading,
    getReservations,
  };
};

