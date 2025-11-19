import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParamList } from "@routes/types";
import { Occurrence } from "@services/occurrenceService/types";

import * as S from "../styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface OccurrenceCardProps {
  occurrence: Occurrence;
}

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return {
        label: "Ativo",
        color: "#FF9800",
        backgroundColor: "#FFF3E0",
        borderColor: "#FF9800",
      };
    case "analysis":
      return {
        label: "Em Análise",
        color: "#2196F3",
        backgroundColor: "#E3F2FD",
        borderColor: "#2196F3",
      };
    case "resolved":
      return {
        label: "Resolvido",
        color: "#4CAF50",
        backgroundColor: "#E8F5E9",
        borderColor: "#4CAF50",
      };
    case "deleted":
      return {
        label: "Deletado",
        color: "#9E9E9E",
        backgroundColor: "#F5F5F5",
        borderColor: "#9E9E9E",
      };
    default:
      return {
        label: status,
        color: "#757575",
        backgroundColor: "#F5F5F5",
        borderColor: "#757575",
      };
  }
};

export const OccurrenceCard: React.FC<OccurrenceCardProps> = ({
  occurrence,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const statusConfig = getStatusConfig(occurrence.status);

  const handlePress = () => {
    navigation.navigate("OccurrenceDetails", { id: occurrence.id.toString() });
  };

  const dateOccurrence =
    occurrence.dateOccurrence || occurrence.date_occurrence || "";

  return (
    <S.CardContainer onPress={handlePress}>
      <S.CardHeader>
        <S.CardTitle>#{occurrence.id}</S.CardTitle>
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
          <S.CardLabel>Data:</S.CardLabel>
          <S.CardValue>{dateOccurrence}</S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Descrição:</S.CardLabel>
          <S.CardValue numberOfLines={2} ellipsizeMode="tail">
            {occurrence.description}
          </S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Monitor:</S.CardLabel>
          <S.CardValue>{occurrence.username || "N/A"}</S.CardValue>
        </S.CardRow>
      </S.CardContent>
    </S.CardContainer>
  );
};

