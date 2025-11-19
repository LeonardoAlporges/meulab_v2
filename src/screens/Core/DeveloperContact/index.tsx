import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button, InfoCard, Input, ScreenContainer } from "@components/index";
import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { supportService } from "@services/supportService";
import { SupportFeedbackRequest } from "@services/supportService/types";

import * as S from "./styles";

interface FeedbackFormData {
  message: string;
}

export default function DeveloperContact() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const schema = useMemo(
    () =>
      Yup.object().shape({
        message: Yup.string()
          .required("Campo obrigatório")
          .min(5, "Digite ao menos 5 caracteres"),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: yupResolver(schema),
  });

  const handleFeedback = async (data: FeedbackFormData) => {
    if (!user?.id || !user?.institutionalEmail) {
      showModal({
        type: "error",
        description: "Não foi possível identificar o usuário autenticado.",
      });
      return;
    }

    const payload: SupportFeedbackRequest = {
      userId: user.id,
      email: user.institutionalEmail,
      message: data.message.trim(),
    };

    showLoading();
    try {
      const response = await supportService.sendFeedback(payload);
      if (response.isSuccess) {
        showModal({
          type: "success",
          description: "Feedback enviado com sucesso! Obrigado pela mensagem.",
        });
        reset();
      } else if (response.isError) {
        showModal({
          type: "error",
          description:
            response.value?.errorMessage ||
            "Não foi possível enviar seu feedback.",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        type: "error",
        description: "Não foi possível enviar seu feedback.",
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Feedback e Contato"
    >
      <InfoCard
        icon="email"
        description="Entre em contato com o desenvolvedor ou envie seu feedback através do formulário abaixo."
      />

      <S.ContentContainer>
        <S.Title>Contato direto</S.Title>
        <S.Text>
          Para falar diretamente com o desenvolvedor, envie um email para:
        </S.Text>
        <S.Highlight>alporges.leonardo@gmail.com</S.Highlight>
        <S.Highlight>Desenvolvedor: Leonardo Alporges Martins</S.Highlight>

        <S.Text style={{ marginTop: 12 }}>
          Você também pode enviar seu feedback utilizando o campo abaixo.
        </S.Text>

        <Input
          control={control}
          label="Feedback"
          name="message"
          placeholder="Digite sua sugestão ou comentário"
          error={errors.message?.message}
          large={true}
          multiline={true}
          numberOfLines={5}
          marginTop={16}
        />

        <Button
          onPress={handleSubmit(handleFeedback)}
          title="Enviar"
          type="PRIMARY"
          marginTop={24}
        />
      </S.ContentContainer>
    </ScreenContainer>
  );
}

