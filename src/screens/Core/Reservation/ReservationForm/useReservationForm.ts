import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { RootStackParamList } from "@routes/types";
import { reservationService } from "@services/reservationService";
import { CreateReservationRequest } from "@services/reservationService/types";
import { validateDate } from "@utils/dateValidation";

export interface ReservationFormData {
  cpf: string;
  phone: string;
  room: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  consentForm: string;
}

const sanitizeDigits = (value: string) => value.replaceAll(/\D/g, "");

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const useReservationForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        cpf: Yup.string()
          .required("Campo obrigatório")
          .test(
            "cpf-length",
            "CPF deve conter 11 dígitos",
            (value) => sanitizeDigits(value || "").length === 11
          ),
        phone: Yup.string()
          .required("Campo obrigatório")
          .test(
            "phone-length",
            "Telefone deve conter ao menos 10 dígitos",
            (value) => sanitizeDigits(value || "").length >= 10
          ),
        room: Yup.string().required("Campo obrigatório"),
        reservationDate: Yup.string()
          .required("Campo obrigatório")
          .test(
            "valid-date",
            "Data inválida. Verifique dia e mês.",
            validateDate
          ),
        startTime: Yup.string().required("Campo obrigatório"),
        endTime: Yup.string()
          .required("Campo obrigatório")
          .test(
            "time-order",
            "Horário final deve ser após o horário inicial",
            function (value) {
              const { startTime } = this.parent as ReservationFormData;
              if (!startTime || !value) return true;
              return toMinutes(value) > toMinutes(startTime);
            }
          ),
        consentForm: Yup.string()
          .required("Campo obrigatório")
          .test(
            "consent-accepted",
            "É necessário aceitar os termos para reservar",
            (value) => value === "yes"
          ),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: yupResolver(formSchema),
  });

  const handleRegister = useCallback(
    async (data: ReservationFormData) => {
      if (!user?.id) {
        showModal({
          description: "Usuário não autenticado",
          type: "error",
        });
        return;
      }

      const [day, month, year] = data.reservationDate.split("/");
      const formattedDate =
        year && month && day ? `${year}-${month}-${day}` : data.reservationDate;

      const payload: CreateReservationRequest = {
        userId: user.id,
        username: user.username,
        email: user.institutionalEmail || "",
        cpf: sanitizeDigits(data.cpf),
        phone: sanitizeDigits(data.phone),
        functionAtUfes: user.functionAtUfes || "Aluno",
        reservationDate: formattedDate,
        startTime: data.startTime,
        endTime: data.endTime,
        consentForm: data.consentForm === "yes",
        room: data.room,
      };

      showLoading();
      try {
        const response = await reservationService.createReservation(payload);
        if (response.isSuccess) {
          showModal({
            description: "Solicitação registrada com sucesso!",
            type: "success",
          });
          reset();
          navigation.navigate("RoomReservationList");
        } else if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage ||
              "Erro ao registrar a solicitação",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao registrar a solicitação",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    },
    [user, showLoading, hideLoading, showModal, reset, navigation]
  );

  return {
    control,
    handleSubmit,
    errors,
    handleRegister,
  };
};

