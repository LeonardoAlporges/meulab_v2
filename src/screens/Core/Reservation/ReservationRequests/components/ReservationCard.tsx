import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParamList } from "@routes/types";
import { Reservation } from "@services/reservationService/types";

import * as S from "../styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ReservationCardProps {
  reservation: Reservation;
}

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case "analysis":
      return {
        label: "Em análise",
        color: "#1E88E5",
        backgroundColor: "#E3F2FD",
        borderColor: "#90CAF9",
      };
    case "aproved":
      return {
        label: "Aprovada",
        color: "#2E7D32",
        backgroundColor: "#E8F5E9",
        borderColor: "#A5D6A7",
      };
    case "reprove":
      return {
        label: "Reprovada",
        color: "#C62828",
        backgroundColor: "#FFEBEE",
        borderColor: "#FFCDD2",
      };
    case "delivered":
      return {
        label: "Cartão entregue",
        color: "#6A1B9A",
        backgroundColor: "#F3E5F5",
        borderColor: "#CE93D8",
      };
    case "returned":
      return {
        label: "Cartão devolvido",
        color: "#00897B",
        backgroundColor: "#E0F2F1",
        borderColor: "#80CBC4",
      };
    default:
      return {
        label: status,
        color: "#546E7A",
        backgroundColor: "#ECEFF1",
        borderColor: "#CFD8DC",
      };
  }
};

export const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const statusConfig = getStatusConfig(reservation.status);

  const handlePress = () => {
    navigation.navigate("RoomReservationDetails", { reservation });
  };

  return (
    <S.CardContainer onPress={handlePress}>
      <S.CardHeader>
        <S.CardTitle>#{reservation.id}</S.CardTitle>
        <S.StatusBadge
          backgroundColor={statusConfig.backgroundColor}
          borderColor={statusConfig.borderColor}
        >
          <S.StatusText color={statusConfig.color}>
            {statusConfig.label}
          </S.StatusText>
        </S.StatusBadge>
      </S.CardHeader>

      <S.CardContent>
        <S.CardRow>
          <S.CardLabel>Solicitante:</S.CardLabel>
          <S.CardValue>{reservation.username}</S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Laboratório:</S.CardLabel>
          <S.CardValue>{reservation.room}</S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Data:</S.CardLabel>
          <S.CardValue>{reservation.reservationDate}</S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Horário:</S.CardLabel>
          <S.CardValue>
            {reservation.startTime} - {reservation.endTime}
          </S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Termos aceitos:</S.CardLabel>
          <S.CardValue>{reservation.consentForm ? "Sim" : "Não"}</S.CardValue>
        </S.CardRow>
      </S.CardContent>
    </S.CardContainer>
  );
};

