import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { useApplication } from "@context/ApplicationContext";
import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { RootStackParamList } from "@routes/types";
import { reservationService } from "@services/reservationService";
import { Reservation } from "@services/reservationService/types";
import { normalizeReservation } from "@utils/reservationMapper";

type RouteProps = RouteProp<RootStackParamList, "RoomReservationDetails">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface ReservationJustifyForm {
  justify: string;
}

export const useReservationDetails = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { user } = useAuth();
  const { moment } = useApplication();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const initialReservation = route.params?.reservation
    ? normalizeReservation(route.params.reservation)
    : null;

  const [reservation, setReservation] = useState<Reservation | null>(
    initialReservation
  );

  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        justify: Yup.string().required("Campo obrigatório"),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationJustifyForm>({
    resolver: yupResolver(formSchema),
    defaultValues: { justify: "" },
  });

  const formattedRequestDate = useMemo(() => {
    if (!reservation?.createdAt) {
      return reservation?.reservationDate || "-";
    }
    try {
      return moment(reservation.createdAt).format(
        "dddd DD [de] MMMM [de] YYYY"
      );
    } catch {
      return reservation.createdAt;
    }
  }, [reservation, moment]);

  const handleApprove = useCallback(async () => {
    if (!reservation?.id) return;
    showLoading();

    try {
      const response = await reservationService.analyzeReservation({
        idReservation: reservation.id,
        approve: true,
        reprove: false,
      });

      if (response.isSuccess) {
        showModal({
          description: "Reserva aprovada com sucesso!",
          type: "success",
        });
        setReservation((prev) =>
          prev ? { ...prev, status: "aproved", justify: null } : prev
        );
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao aprovar a reserva",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao aprovar a reserva",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [reservation, showLoading, hideLoading, showModal]);

  const handleReprove = useCallback(
    async (data: ReservationJustifyForm) => {
      if (!reservation?.id) return;

      showLoading();
      try {
        const response = await reservationService.analyzeReservation({
          idReservation: reservation.id,
          approve: false,
          reprove: true,
          justify: data.justify,
        });

        if (response.isSuccess) {
          showModal({
            description: "Reserva reprovada com sucesso",
            type: "success",
          });
          setReservation((prev) =>
            prev
              ? { ...prev, status: "reprove", justify: data.justify || "" }
              : prev
          );
          reset();
        } else if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao reprovar a reserva",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao reprovar a reserva",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    },
    [reservation, showLoading, hideLoading, showModal, reset]
  );

  const handleDelivered = useCallback(async () => {
    if (!reservation?.id) return;

    showLoading();
    try {
      const response = await reservationService.markReservationDelivered(
        reservation.id
      );
      if (response.isSuccess) {
        showModal({
          description: "Entrega registrada com sucesso",
          type: "success",
        });
        setReservation((prev) =>
          prev
            ? { ...prev, status: "delivered", isDelivered: true }
            : prev
        );
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao marcar como entregue",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao marcar como entregue",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [reservation, showLoading, hideLoading, showModal]);

  const handleReturned = useCallback(async () => {
    if (!reservation?.id) return;

    showLoading();
    try {
      const response = await reservationService.markReservationReturned(
        reservation.id
      );
      if (response.isSuccess) {
        showModal({
          description: "Devolução registrada com sucesso",
          type: "success",
        });
        setReservation((prev) =>
          prev
            ? { ...prev, status: "returned", isReturned: true }
            : prev
        );
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao marcar devolução",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao marcar devolução",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [reservation, showLoading, hideLoading, showModal]);

  return {
    reservation,
    control,
    handleSubmit,
    errors,
    handleApprove,
    handleReprove,
    handleDelivered,
    handleReturned,
    isCoordinator: !!user?.isCoordinator,
    isWatchman: !!user?.isWatchman,
    formattedRequestDate,
  };
};

