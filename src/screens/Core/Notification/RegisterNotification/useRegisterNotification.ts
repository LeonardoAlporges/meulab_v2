import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { notificationService } from "@services/notificationService";
import { CreateNotificationRequest } from "@services/notificationService/types";

export interface RegisterNotificationFormData {
  title: string;
  description: string;
}

export const useRegisterNotification = () => {
  const { showLoading, hideLoading } = useLoading();
  const { showModal, hideModal } = useModal();

  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string()
          .required("Campo obrigatório")
          .min(3, "Mínimo de 3 caracteres")
          .max(30, "Máximo de 30 caracteres"),
        description: Yup.string()
          .required("Campo obrigatório")
          .min(3, "Mínimo de 3 caracteres")
          .max(200, "Máximo de 200 caracteres"),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterNotificationFormData>({
    resolver: yupResolver(formSchema),
  });

  const sendNotification = useCallback(
    async (data: RegisterNotificationFormData) => {
      const payload: CreateNotificationRequest = {
        title: data.title,
        description: data.description,
      };

      showLoading();
      try {
        const response = await notificationService.createNotification(payload);
        if (response.isSuccess) {
          showModal({
            type: "success",
            description: "Notificação enviada com sucesso!",
          });
          reset();
        } else if (response.isError) {
          showModal({
            type: "error",
            description:
              response.value?.errorMessage ||
              "Erro ao enviar a notificação. Tente novamente.",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          type: "error",
          description: "Erro ao enviar a notificação. Tente novamente.",
        });
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading, showModal, reset]
  );

  const handleConfirmSubmit = useCallback(
    (data: RegisterNotificationFormData) => {
      showModal({
        title: "Atenção!",
        description: "Deseja continuar com o envio da notificação?",
        type: "alert",
        buttons: [
          {
            title: "Cancelar",
            type: "TERTIARY",
            onPress: hideModal,
          },
          {
            title: "Enviar",
            type: "PRIMARY",
            onPress: () => {
              hideModal();
              void sendNotification(data);
            },
          },
        ],
      });
    },
    [showModal, hideModal, sendNotification]
  );

  return {
    control,
    handleSubmit,
    errors,
    handleConfirmSubmit,
  };
};

