import React from "react";
import { FlatList } from "react-native";

import { InfoCard, ScreenContainer } from "@components/index";

import * as S from "./styles";
import { ReservationCard, ReservationLegends } from "./components";
import { useReservationRequests } from "./useReservationRequests";

export default function RoomReservationList() {
  const { reservations, empty, isLoading } = useReservationRequests();

  return (
    <ScreenContainer
      scrollable={false}
      goBack={true}
      previousScreenName="Home"
      title="Solicitações de Reserva"
    >
      <InfoCard
        icon="list-alt"
        description="Acompanhe o status de suas solicitações. A coordenação responde em até 2 dias úteis."
      />

      {!isLoading && empty && (
        <S.EmptyContainer>
          <S.EmptyText>Ainda não existem reservas cadastradas.</S.EmptyText>
        </S.EmptyContainer>
      )}

      {!isLoading && !empty && (
        <>
          <FlatList
            data={reservations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ReservationCard reservation={item} />}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
          <ReservationLegends />
        </>
      )}
    </ScreenContainer>
  );
}

