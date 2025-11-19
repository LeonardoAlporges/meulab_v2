import { yupResolver } from "@hookform/resolvers/yup";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { RootStackParamList } from "@routes/types";
import { supportService } from "@services/supportService";
import { CreateSupportRequest } from "@services/supportService/types";
import { validateDate } from "@utils/dateValidation";

export interface SupportFormData {
  requestType: string;
  room: string;
  equipmentIdentification: string;
  description: string;
  dateOccurrence: string;
  userId?: number;
  functionAtUfes?: string;
}

export const useSupportForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        requestType: Yup.string().required("Campo obrigatório"),
        room: Yup.string().required("Campo obrigatório"),
        equipmentIdentification: Yup.string().required("Campo obrigatório"),
        description: Yup.string().required("Campo obrigatório"),
        dateOccurrence: Yup.string()
          .required("Campo obrigatório")
          .test(
            "valid-date",
            "Data inválida. Verifique dia e mês.",
            validateDate
          ),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      userId: user?.id,
      functionAtUfes: user?.functionAtUfes || "Aluno",
    },
  });

  const handleRegister = useCallback(
    async (data: SupportFormData) => {
      if (!user?.id) {
        showModal({
          description: "Usuário não autenticado",
          type: "error",
        });
        return;
      }

      const payload: CreateSupportRequest = {
        userId: user.id,
        functionAtUfes: data.functionAtUfes || user.functionAtUfes || "Aluno",
        requestType: data.requestType,
        room: data.room,
        equipmentIdentification: data.equipmentIdentification,
        description: data.description,
        dateOccurrence: data.dateOccurrence,
        status: "active",
      };

      showLoading();
      try {
        const response = await supportService.createSupport(payload);
        if (response.isSuccess) {
          showModal({
            description: "Solicitação de suporte enviada com sucesso!",
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
              response.value?.errorMessage || "Erro ao enviar solicitação",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao enviar solicitação",
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
