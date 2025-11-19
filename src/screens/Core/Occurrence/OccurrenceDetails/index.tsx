import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

import { useApplication } from "@context/ApplicationContext";
import { useAuth } from "@context/AuthContext";

import { InfoCard, Input, ScreenContainer } from "@components/index";

import * as S from "./styles";
import { useOccurrenceDetails } from "./useOccurrenceDetails";

export default function OccurrenceDetails() {
  const { user } = useAuth();
  const { moment } = useApplication();
  const {
    occurrence,
    control,
    handleSubmit,
    errors,
    getOccurrenceDetails,
    setOccurrenceInAnalysis,
    deleteOccurrence,
    resolveOccurrence,
  } = useOccurrenceDetails();

  const [formattedDate, setFormattedDate] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      getOccurrenceDetails();
    }, [getOccurrenceDetails])
  );

  React.useEffect(() => {
    if (occurrence?.dateOccurrence || occurrence?.date_occurrence) {
      try {
        const dateStr = occurrence.dateOccurrence || occurrence.date_occurrence || "";
        const date = moment(dateStr).format("dddd DD [de] MMMM [de] YYYY");
        setFormattedDate(date);
      } catch (error) {
        setFormattedDate(
          occurrence.dateOccurrence || occurrence.date_occurrence || ""
        );
      }
    }
  }, [occurrence, moment]);

  if (!occurrence) {
    return (
      <ScreenContainer
        scrollable={true}
        goBack={true}
        previousScreenName="Home"
        title="Detalhes da Ocorrência"
      >
        <InfoCard
          icon="info"
          description="Carregando informações da ocorrência..."
        />
      </ScreenContainer>
    );
  }

  const occurrenceUser =
    occurrence.occurrenceUser || occurrence.occurrence_user || "";
  const username = occurrence.username || "N/A";
  const provisions = occurrence.provisions || "";
  const descriptionResolution =
    occurrence.descriptionResolution ||
    occurrence.description_resolution ||
    null;

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Detalhes da Ocorrência"
    >
      <InfoCard
        icon="info"
        description="Confira os detalhes abaixo sobre a ocorrência."
      />

      <S.ContentContainer>
        <S.TitleArea>
          <S.DataOcorrenciaTitle>Data da Ocorrência:</S.DataOcorrenciaTitle>
          <S.DataOcorrencia>
            {formattedDate ||
              occurrence.dateOccurrence ||
              occurrence.date_occurrence}
          </S.DataOcorrencia>
        </S.TitleArea>

        <S.TitleArea>
          <S.DescricaoTitle>Descrição:</S.DescricaoTitle>
          <S.DescricaoOcorrencia>{occurrence.description}</S.DescricaoOcorrencia>
        </S.TitleArea>

        <S.TitleArea>
          <S.ProvidenciasTitle>Providências:</S.ProvidenciasTitle>
          <S.Providencias>{provisions}</S.Providencias>
        </S.TitleArea>

        <S.TitleArea>
          <S.ProvidenciasTitle>Pessoas envolvidas:</S.ProvidenciasTitle>
          <S.Providencias>{occurrenceUser}</S.Providencias>
        </S.TitleArea>

        <S.TitleArea>
          <S.ProvidenciasTitle>Monitor responsável:</S.ProvidenciasTitle>
          <S.Providencias>{username}</S.Providencias>
        </S.TitleArea>

        <S.TitleArea>
          <S.ProvidenciasTitle>Descrição da Solução:</S.ProvidenciasTitle>
          {descriptionResolution ? (
            <S.Providencias>{descriptionResolution}</S.Providencias>
          ) : (
            <S.Providencias>Ocorrência ainda não analisada.</S.Providencias>
          )}
        </S.TitleArea>

        {(occurrence.status === "active" || occurrence.status === "analysis") &&
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
            {(occurrence.status === "active" ||
              occurrence.status === "analysis") && (
              <S.ButonStatus
                status="resolvido"
                onPress={handleSubmit(resolveOccurrence)}
              >
                <S.TitleButton>Resolvido</S.TitleButton>
              </S.ButonStatus>
            )}

            {occurrence.status === "active" && (
              <S.ButonStatus status="analise" onPress={setOccurrenceInAnalysis}>
                <S.TitleButton>Em análise</S.TitleButton>
              </S.ButonStatus>
            )}

            {occurrence.status !== "deleted" && (
              <S.ButonStatus status="deletar" onPress={deleteOccurrence}>
                <S.TitleButton>Deletar</S.TitleButton>
              </S.ButonStatus>
            )}
          </S.ButtonArea>
        )}
      </S.ContentContainer>
    </ScreenContainer>
  );
}

