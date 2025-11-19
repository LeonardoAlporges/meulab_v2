import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { RootStackParamList } from "@routes/types";
import { occurrenceService } from "@services/occurrenceService";
import {
  Occurrence,
  UpdateOccurrenceStatusRequest,
} from "@services/occurrenceService/types";

export interface OccurrenceDetailsFormData {
  descriptionResolution: string;
}

export const useOccurrenceDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal, hideModal } = useModal();

  const { id } = (route.params as { id?: string }) || {};
  const [occurrence, setOccurrence] = useState<Occurrence | null>(null);

  const formSchema = Yup.object().shape({
    descriptionResolution: Yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OccurrenceDetailsFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      descriptionResolution: "",
    },
  });

  const getOccurrenceDetails = useCallback(async () => {
    if (!id || !user) return;

    showLoading();
    try {
      // Buscar todas as ocorrências e encontrar a específica
      let response;
      if (user.isCoordinator) {
        response = await occurrenceService.getAllOccurrences();
      } else if (user.idMonitor) {
        response = await occurrenceService.getOccurrenceByIdMonitor(
          user.idMonitor
        );
      } else {
        return;
      }

      if (response.isSuccess && response.value) {
        const occurrencesList = Array.isArray(response.value)
          ? response.value
          : [];
        const foundOccurrence = occurrencesList.find(
          (o) => o.id.toString() === id.toString()
        );
        if (foundOccurrence) {
          setOccurrence(foundOccurrence);
          if (foundOccurrence.descriptionResolution) {
            reset({
              descriptionResolution: foundOccurrence.descriptionResolution,
            });
          }
        } else {
          showModal({
            description: "Ocorrência não encontrada",
            type: "error",
          });
          navigation.goBack();
        }
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao carregar ocorrência",
          type: "error",
        });
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao carregar ocorrência",
        type: "error",
      });
      navigation.goBack();
    } finally {
      hideLoading();
    }
  }, [id, user, showLoading, hideLoading, showModal, navigation, reset]);

  const setOccurrenceInAnalysis = useCallback(async () => {
    if (!occurrence?.id) return;

    showLoading();
    try {
      const response = await occurrenceService.setOccurrenceInAnalysis(
        occurrence.id
      );
      if (response.isSuccess) {
        showModal({
          description: "Ocorrência marcada como em análise",
          type: "success",
        });
        await getOccurrenceDetails();
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao atualizar ocorrência",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao atualizar ocorrência",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [occurrence, showLoading, hideLoading, showModal, getOccurrenceDetails]);

  const deleteOccurrence = useCallback(async () => {
    if (!occurrence?.id) return;

    const executeDeletion = async () => {
      hideModal();
      showLoading();
      try {
        const response = await occurrenceService.deleteOccurrence(
          occurrence.id
        );
        if (response.isSuccess) {
          showModal({
            description: "Ocorrência deletada com sucesso",
            type: "success",
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" as keyof RootStackParamList }],
            })
          );
        } else if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao deletar ocorrência",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao deletar ocorrência",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    };

    showModal({
      title: "Confirmar exclusão",
      description: "Tem certeza que deseja deletar essa ocorrência?",
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
            executeDeletion();
          },
        },
      ],
    });
  }, [occurrence, showLoading, hideLoading, showModal, hideModal, navigation]);

  const resolveOccurrence = useCallback(
    async (data: OccurrenceDetailsFormData) => {
      if (!occurrence?.id) return;

      const payload: UpdateOccurrenceStatusRequest = {
        descriptionResolution: data.descriptionResolution,
      };

      showLoading();
      try {
        const response = await occurrenceService.resolveOccurrence(
          occurrence.id,
          payload
        );
        if (response.isSuccess) {
          showModal({
            description: "Ocorrência resolvida com sucesso",
            type: "success",
          });
          await getOccurrenceDetails();
        } else if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao resolver ocorrência",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao resolver ocorrência",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    },
    [occurrence, showLoading, hideLoading, showModal, getOccurrenceDetails]
  );

  return {
    occurrence,
    control,
    handleSubmit,
    errors,
    getOccurrenceDetails,
    setOccurrenceInAnalysis,
    deleteOccurrence,
    resolveOccurrence,
  };
};

