import React from "react";

import { Button, InfoCard, Input, ScreenContainer } from "@components/index";
import { useAuth } from "@context/AuthContext";

import * as S from "./styles";
import { useRegisterNotification } from "./useRegisterNotification";

export default function RegisterNotification() {
  const { user } = useAuth();
  const { control, handleSubmit, errors, handleConfirmSubmit } =
    useRegisterNotification();

  const isCoordinator = user?.isCoordinator;

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Registrar Notificação"
    >
      <InfoCard
        icon="campaign"
        description="Envie notificações para todos os usuários. Seja objetivo e revise antes de enviar."
      />

      {!isCoordinator ? (
        <S.RestrictedContainer>
          <S.RestrictedText>
            Esta funcionalidade é restrita aos coordenadores.
          </S.RestrictedText>
        </S.RestrictedContainer>
      ) : (
        <S.FormContainer>
          <Input
            control={control}
            label="Título da notificação"
            name="title"
            placeholder="Informe um título curto"
            error={errors.title?.message}
            large={true}
            marginTop={0}
          />

          <Input
            control={control}
            label="Descrição"
            name="description"
            placeholder="Texto que aparecerá na notificação"
            error={errors.description?.message}
            large={true}
            multiline={true}
            marginTop={12}
          />

          <Button
            onPress={handleSubmit(handleConfirmSubmit)}
            title="Enviar notificação"
            type="PRIMARY"
            marginTop={24}
          />
        </S.FormContainer>
      )}
    </ScreenContainer>
  );
}

