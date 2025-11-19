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
import { supportService } from "@services/supportService";
import { Support, UpdateSupportStatusRequest } from "@services/supportService/types";

export interface SupportDetailsFormData {
  descriptionResolution: string;
}

export const useSupportDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal, hideModal } = useModal();

  const { id } = (route.params as { id?: string }) || {};
  const [support, setSupport] = useState<Support | null>(null);

  const formSchema = Yup.object().shape({
    descriptionResolution: Yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportDetailsFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      descriptionResolution: "",
    },
  });

  const getSupportDetails = useCallback(async () => {
    if (!id) return;

    showLoading();
    try {
      // Buscar todas as solicitações e encontrar a específica
      let response;
      if (user?.isCoordinator) {
        response = await supportService.getAllSupports();
      } else if (user?.id) {
        response = await supportService.getSupportById(user.id);
      } else {
        return;
      }

      if (response.isSuccess && response.value) {
        const supportsList = Array.isArray(response.value) ? response.value : [];
        const foundSupport = supportsList.find(
          (s) => s.id.toString() === id.toString()
        );
        if (foundSupport) {
          setSupport(foundSupport);
          if (foundSupport.descriptionResolution) {
            reset({
              descriptionResolution: foundSupport.descriptionResolution,
            });
          }
        } else {
          showModal({
            description: "Solicitação não encontrada",
            type: "error",
          });
          navigation.goBack();
        }
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao carregar solicitação",
          type: "error",
        });
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao carregar solicitação",
        type: "error",
      });
      navigation.goBack();
    } finally {
      hideLoading();
    }
  }, [id, user, showLoading, hideLoading, showModal, navigation, reset]);

  const setSupportInAnalysis = useCallback(async () => {
    if (!support?.id) return;

    showLoading();
    try {
      const response = await supportService.setSupportInAnalysis(support.id);
      if (response.isSuccess) {
        showModal({
          description: "Solicitação marcada como em análise",
          type: "success",
        });
        await getSupportDetails();
      } else if (response.isError) {
        showModal({
          description:
            response.value?.errorMessage || "Erro ao atualizar solicitação",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao atualizar solicitação",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [support, showLoading, hideLoading, showModal, getSupportDetails]);

  const deleteSupport = useCallback(async () => {
    if (!support?.id) return;

    const executeDeletion = async () => {
      hideModal();
      showLoading();
      try {
        const response = await supportService.deleteSupport(support.id);
        if (response.isSuccess) {
          showModal({
            description: "Solicitação deletada com sucesso",
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
              response.value?.errorMessage || "Erro ao deletar solicitação",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao deletar solicitação",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    };

    showModal({
      title: "Confirmar exclusão",
      description:
        "Tem certeza que deseja deletar essa solicitação de suporte?",
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
  }, [support, showLoading, hideLoading, showModal, hideModal, navigation]);

  const resolveSupport = useCallback(
    async (data: SupportDetailsFormData) => {
      if (!support?.id) return;

      const payload: UpdateSupportStatusRequest = {
        descriptionResolution: data.descriptionResolution,
      };

      showLoading();
      try {
        const response = await supportService.resolveSupport(
          support.id,
          payload
        );
        if (response.isSuccess) {
          showModal({
            description: "Solicitação resolvida com sucesso",
            type: "success",
          });
          await getSupportDetails();
        } else if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao resolver solicitação",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao resolver solicitação",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    },
    [support, showLoading, hideLoading, showModal, getSupportDetails]
  );

  return {
    support,
    control,
    handleSubmit,
    errors,
    getSupportDetails,
    setSupportInAnalysis,
    deleteSupport,
    resolveSupport,
  };
};

