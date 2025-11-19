import React from "react";

import { InfoCard, Input, ScreenContainer } from "@components/index";

import * as S from "./styles";
import { useReservationDetails } from "./useReservationDetails";

const statusStyles = {
  analysis: {
    label: "Reserva em análise",
    color: "#1E88E5",
    background: "#E3F2FD",
    border: "#90CAF9",
  },
  aproved: {
    label: "Reserva aprovada",
    color: "#2E7D32",
    background: "#E8F5E9",
    border: "#A5D6A7",
  },
  reprove: {
    label: "Reserva reprovada",
    color: "#C62828",
    background: "#FFEBEE",
    border: "#FFCDD2",
  },
  delivered: {
    label: "Cartão entregue",
    color: "#6A1B9A",
    background: "#F3E5F5",
    border: "#CE93D8",
  },
  returned: {
    label: "Cartão devolvido",
    color: "#00897B",
    background: "#E0F2F1",
    border: "#80CBC4",
  },
};

export default function RoomReservationDetails() {
  const {
    reservation,
    control,
    handleSubmit,
    errors,
    handleApprove,
    handleReprove,
    handleDelivered,
    handleReturned,
    isCoordinator,
    isWatchman,
    formattedRequestDate,
  } = useReservationDetails();

  if (!reservation) {
    return (
      <ScreenContainer
        scrollable={true}
        goBack={true}
        previousScreenName="RoomReservationList"
        title="Detalhes da Reserva"
      >
        <InfoCard
          icon="error-outline"
          description="Não foi possível carregar os detalhes da reserva."
        />
      </ScreenContainer>
    );
  }

  const statusConfig =
    statusStyles[
      reservation.status as keyof typeof statusStyles
    ] || statusStyles.analysis;

  const canApprove =
    isCoordinator && reservation.status === "analysis";
  const canMarkDelivered =
    (isCoordinator || isWatchman) &&
    reservation.status === "aproved" &&
    !reservation.isDelivered;
  const canMarkReturned =
    (isCoordinator || isWatchman) &&
    reservation.status === "delivered" &&
    reservation.isDelivered &&
    !reservation.isReturned;

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="RoomReservationList"
      title="Detalhes da Reserva"
    >
      <InfoCard
        icon="info"
        description="Confira os detalhes e acompanhe o fluxo da solicitação."
      />

      <S.Section>
        <S.SectionTitle>Status da solicitação</S.SectionTitle>
        <S.StatusContainer>
          <S.StatusBadge
            background={statusConfig.background}
            border={statusConfig.border}
          >
            <S.StatusText color={statusConfig.color}>
              {statusConfig.label}
            </S.StatusText>
          </S.StatusBadge>
        </S.StatusContainer>
      </S.Section>

      {reservation.status === "reprove" && reservation.justify && (
        <S.Section>
          <S.SectionTitle>Justificativa da reprovação</S.SectionTitle>
          <S.SectionValue>{reservation.justify}</S.SectionValue>
        </S.Section>
      )}

      <S.Section>
        <S.SectionTitle>Data da solicitação</S.SectionTitle>
        <S.SectionValue>{formattedRequestDate}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Solicitante</S.SectionTitle>
        <S.SectionValue>{reservation.username}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>CPF</S.SectionTitle>
        <S.SectionValue>{reservation.cpf}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Email</S.SectionTitle>
        <S.SectionValue>{reservation.email}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Telefone</S.SectionTitle>
        <S.SectionValue>{reservation.phone}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Função na UFES</S.SectionTitle>
        <S.SectionValue>
          {reservation.functionAtUfes || "Não informado"}
        </S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Laboratório</S.SectionTitle>
        <S.SectionValue>{reservation.room}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Data da reserva</S.SectionTitle>
        <S.SectionValue>{reservation.reservationDate}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Horário</S.SectionTitle>
        <S.SectionValue>
          {reservation.startTime} - {reservation.endTime}
        </S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Termos aceitos?</S.SectionTitle>
        <S.SectionValue>{reservation.consentForm ? "Sim" : "Não"}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Cartão entregue ao solicitante?</S.SectionTitle>
        <S.SectionValue>{reservation.isDelivered ? "Sim" : "Não"}</S.SectionValue>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Cartão devolvido ao setor?</S.SectionTitle>
        <S.SectionValue>{reservation.isReturned ? "Sim" : "Não"}</S.SectionValue>
      </S.Section>

      {(isCoordinator || isWatchman) && (
        <S.ButtonGroup>
          {canApprove && (
            <>
              <Input
                control={control}
                label="Justificativa da reprovação"
                name="justify"
                placeholder="Descreva o motivo da reprovação"
                error={errors.justify?.message}
                large={true}
                multiline={true}
              />

              <S.ActionButton background="#2E7D32" onPress={handleApprove}>
                <S.ActionButtonText>Aprovar</S.ActionButtonText>
              </S.ActionButton>

              <S.ActionButton
                background="#C62828"
                onPress={handleSubmit(handleReprove)}
              >
                <S.ActionButtonText>Reprovar</S.ActionButtonText>
              </S.ActionButton>
            </>
          )}

          {canMarkDelivered && (
            <S.ActionButton background="#6A1B9A" onPress={handleDelivered}>
              <S.ActionButtonText>Marcar como entregue</S.ActionButtonText>
            </S.ActionButton>
          )}

          {canMarkReturned && (
            <S.ActionButton background="#00897B" onPress={handleReturned}>
              <S.ActionButtonText>Marcar como devolvido</S.ActionButtonText>
            </S.ActionButton>
          )}
        </S.ButtonGroup>
      )}
    </ScreenContainer>
  );
}

