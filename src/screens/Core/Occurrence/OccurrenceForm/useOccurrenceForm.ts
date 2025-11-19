import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { RootStackParamList } from "@routes/types";
import { occurrenceService } from "@services/occurrenceService";
import { CreateOccurrenceRequest } from "@services/occurrenceService/types";
import { validateDate } from "@utils/dateValidation";

export interface OccurrenceFormData {
  description: string;
  dateOccurrence: string;
  occurrenceUser: string;
  provisions: string;
  monitorResponsibleId?: number;
}

export const useOccurrenceForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        description: Yup.string().required("Campo obrigatório"),
        dateOccurrence: Yup.string()
          .required("Campo obrigatório")
          .min(10, "Mínimo de 10 caracteres")
          .max(10, "Data incorreta")
          .test("valid-date", "Data inválida. Verifique dia e mês.", validateDate),
        occurrenceUser: Yup.string().required("Campo obrigatório"),
        provisions: Yup.string()
          .required("Campo obrigatório")
          .max(500, "Máximo de 500 caracteres"),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OccurrenceFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      monitorResponsibleId: user?.idMonitor,
    },
  });

  const handleRegister = useCallback(
    async (data: OccurrenceFormData) => {
      if (!user?.idMonitor) {
        showModal({
          description: "Usuário não é um monitor",
          type: "error",
        });
        return;
      }

      const payload: CreateOccurrenceRequest = {
        monitorResponsibleId: user.idMonitor,
        dateOccurrence: data.dateOccurrence,
        description: data.description,
        provisions: data.provisions,
        occurrenceUser: data.occurrenceUser,
        status: "active",
      };

      showLoading();
      try {
        const response = await occurrenceService.createOccurrence(payload);
        if (response.isSuccess) {
          showModal({
            description: "Ocorrência registrada com sucesso!",
            type: "success",
          });
          reset();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" as keyof RootStackParamList }],
            })
          );
        } else if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao registrar ocorrência",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao registrar ocorrência",
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

