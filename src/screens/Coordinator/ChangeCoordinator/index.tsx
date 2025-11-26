import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import {
  Button,
  InfoCard,
  Input,
  ScreenContainer,
} from "@components/index";
import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { userService } from "@services/userService";
import { ChangeCoordinatorRequest } from "@services/userService/types";

import * as S from "./styles";

interface ChangeCoordinatorFormData {
  email: string;
}

export default function ChangeCoordinator() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal, hideModal } = useModal();

  const isCoordinator = !!user?.isCoordinator;

  const schema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email("Insira um email válido")
          .required("Campo obrigatório"),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangeCoordinatorFormData>({
    resolver: yupResolver(schema),
  });

  const submitChange = useCallback(
    async (data: ChangeCoordinatorFormData) => {
      const payload: ChangeCoordinatorRequest = {
        institutionalEmail: data.email.trim(),
      };

      showLoading();
      try {
        const response = await userService.changeCoordinator(payload);
        if (response.isSuccess) {
          showModal({
            type: "success",
            description: "Coordenador alterado com sucesso.",
            buttons: [
              {
                title: "Ok",
                type: "PRIMARY",
                onPress: () => {
                  hideModal();
                  navigation.goBack();
                },
              },
            ],
          });
          reset();
        } else if (response.isError) {
          showModal({
            type: "error",
            description:
              response.value?.errorMessage ||
              "Não foi possível alterar o coordenador.",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          type: "error",
          description: "Não foi possível alterar o coordenador.",
        });
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading, showModal, hideModal, navigation, reset]
  );

  const handleConfirm = useCallback(
    (data: ChangeCoordinatorFormData) => {
      showModal({
        title: "Atenção!",
        description:
          "Tem certeza que deseja definir o novo coordenador de laboratórios?",
        type: "alert",
        buttons: [
          {
            title: "Cancelar",
            type: "TERTIARY",
            onPress: hideModal,
          },
          {
            title: "Confirmar",
            type: "PRIMARY",
            onPress: () => {
              hideModal();
              void submitChange(data);
            },
          },
        ],
      });
    },
    [hideModal, showModal, submitChange]
  );

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Alterar Coordenador"
    >
      <InfoCard
        icon="admin-panel-settings"
        description="Informe o email institucional do novo coordenador dos laboratórios."
      />

      {!isCoordinator ? (
        <S.RestrictedContainer>
          <S.RestrictedText>
            Apenas coordenadores podem alterar o responsável pelos laboratórios.
          </S.RestrictedText>
        </S.RestrictedContainer>
      ) : (
        <S.FormContainer>
          <Input
            control={control}
            label="Email institucional"
            name="email"
            placeholder="coordenador@ufes.br"
            error={errors.email?.message}
            large={true}
            marginTop={0}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Button
            onPress={handleSubmit(handleConfirm)}
            title="Enviar"
            type="PRIMARY"
            marginTop={24}
          />
        </S.FormContainer>
      )}
    </ScreenContainer>
  );
}

