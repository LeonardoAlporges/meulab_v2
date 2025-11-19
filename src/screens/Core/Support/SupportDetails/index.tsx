import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

import { useApplication } from "@context/ApplicationContext";
import { useAuth } from "@context/AuthContext";

import { Button, InfoCard, Input, ScreenContainer } from "@components/index";

import * as S from "./styles";
import { useSupportDetails } from "./useSupportDetails";

export default function SupportDetails() {
  const { user } = useAuth();
  const { moment } = useApplication();
  const {
    support,
    control,
    handleSubmit,
    errors,
    getSupportDetails,
    setSupportInAnalysis,
    deleteSupport,
    resolveSupport,
  } = useSupportDetails();

  const [formattedDate, setFormattedDate] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      getSupportDetails();
    }, [getSupportDetails])
  );

  React.useEffect(() => {
    if (support?.dateOccurrence) {
      try {
        const date = moment(support.dateOccurrence).format(
          "dddd DD [de] MMMM [de] YYYY"
        );
        setFormattedDate(date);
      } catch (error) {
        setFormattedDate(support.dateOccurrence);
      }
    }
  }, [support, moment]);

  if (!support) {
    return (
      <ScreenContainer
        scrollable={true}
        goBack={true}
        previousScreenName="Home"
        title="Detalhes do Suporte"
      >
        <InfoCard
          icon="info"
          description="Carregando informações da solicitação..."
        />
      </ScreenContainer>
    );
  }

  const functionAtUfesLabel =
    support.functionAtUfes === "student" || support.functionAtUfes === "Aluno"
      ? "Estudante"
      : "Servidor";

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Detalhes do Suporte"
    >
      <InfoCard
        icon="info"
        description="Confira os detalhes abaixo sobre o suporte."
      />

      <S.ContentContainer>
        <S.TitleArea>
          <S.DataSuporteTitle>Data da Solicitação:</S.DataSuporteTitle>
          <S.DataSuporte>{formattedDate || support.dateOccurrence}</S.DataSuporte>
        </S.TitleArea>

        <S.TitleArea>
          <S.DescricaoTitle>Função na UFES:</S.DescricaoTitle>
          <S.DescricaoSuporte>{functionAtUfesLabel}</S.DescricaoSuporte>
        </S.TitleArea>

        <S.TitleArea>
          <S.DescricaoTitle>Tipo de Solicitação:</S.DescricaoTitle>
          <S.DescricaoSuporte>{support.requestType}</S.DescricaoSuporte>
        </S.TitleArea>

        <S.TitleArea>
          <S.DescricaoTitle>Laboratório:</S.DescricaoTitle>
          <S.DescricaoSuporte>{support.room}</S.DescricaoSuporte>
        </S.TitleArea>

        <S.TitleArea>
          <S.DescricaoTitle>Identificação do Equipamento:</S.DescricaoTitle>
          <S.DescricaoSuporte>
            {support.equipmentIdentification}
          </S.DescricaoSuporte>
        </S.TitleArea>

        <S.TitleArea>
          <S.DescricaoTitle>Descrição:</S.DescricaoTitle>
          <S.DescricaoSuporte>{support.description}</S.DescricaoSuporte>
        </S.TitleArea>

        <S.TitleArea>
          <S.ProvidenciasTitle>Descrição da Solução:</S.ProvidenciasTitle>
          {support.descriptionResolution ? (
            <S.Providencias>{support.descriptionResolution}</S.Providencias>
          ) : (
            <S.Providencias>Solicitação ainda em Análise.</S.Providencias>
          )}
        </S.TitleArea>

        {(support.status === "active" || support.status === "analysis") &&
          user?.isCoordinator && (
            <S.Linha>
              <Input
                control={control}
                label="Descrição da Solução"
                name="descriptionResolution"
                placeholder="Descreva a solução aplicada"
                error={errors.descriptionResolution?.message}
                large={true}
                multiline={true}
                marginTop={0}
              />
            </S.Linha>
          )}

        {user?.isCoordinator && (
          <S.ButtonArea>
            {(support.status === "active" ||
              support.status === "analysis") && (
              <S.ButonStatus
                status="resolvido"
                onPress={handleSubmit(resolveSupport)}
              >
                <S.TitleButton>Resolvido</S.TitleButton>
              </S.ButonStatus>
            )}

            {support.status === "active" && (
              <S.ButonStatus status="analise" onPress={setSupportInAnalysis}>
                <S.TitleButton>Em análise</S.TitleButton>
              </S.ButonStatus>
            )}

            {support.status !== "deleted" && (
              <S.ButonStatus status="deletar" onPress={deleteSupport}>
                <S.TitleButton>Deletar</S.TitleButton>
              </S.ButonStatus>
            )}
          </S.ButtonArea>
        )}
      </S.ContentContainer>
    </ScreenContainer>
  );
}

