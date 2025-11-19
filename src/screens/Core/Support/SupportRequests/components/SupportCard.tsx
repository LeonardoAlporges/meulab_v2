import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";

import { RootStackParamList } from "@routes/types";
import { Support } from "@services/supportService/types";

import * as S from "../styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SupportCardProps {
  support: Support;
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

export const SupportCard: React.FC<SupportCardProps> = ({ support }) => {
  const navigation = useNavigation<NavigationProp>();
  const statusConfig = getStatusConfig(support.status);

  const handlePress = () => {
    navigation.navigate("SupportDetails", { id: support.id.toString() });
  };

  return (
    <S.CardContainer onPress={handlePress}>
      <S.CardHeader>
        <S.CardTitle>#{support.id}</S.CardTitle>
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
          <S.CardLabel>Tipo:</S.CardLabel>
          <S.CardValue>{support.requestType}</S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Laboratório:</S.CardLabel>
          <S.CardValue>{support.room}</S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Equipamento:</S.CardLabel>
          <S.CardValue numberOfLines={1} ellipsizeMode="tail">
            {support.equipmentIdentification}
          </S.CardValue>
        </S.CardRow>

        <S.CardRow>
          <S.CardLabel>Data:</S.CardLabel>
          <S.CardValue>{support.dateOccurrence}</S.CardValue>
        </S.CardRow>
      </S.CardContent>
    </S.CardContainer>
  );
};

