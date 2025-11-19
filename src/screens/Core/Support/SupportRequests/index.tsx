import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { InfoCard, Label, ScreenContainer } from "@components/index";
import { RootStackParamList } from "@routes/types";

import { SupportCard, SupportLegends } from "./components";
import * as S from "./styles";
import { useSupportRequests } from "./useSupportRequests";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function SupportRequests() {
  const navigation = useNavigation<NavigationProp>();
  const { supports, empty, isLoading } = useSupportRequests();

  return (
    <ScreenContainer
      scrollable={false}
      goBack={true}
      previousScreenName="Home"
      title="Solicitações de Suporte"
    >
      <InfoCard
        icon="info"
        description="Acompanhe o status de suas solicitações. Em até 2 dias úteis o coordenador responsável irá analisar."
      />

      {!isLoading && empty && (
        <S.EmptyContainer>
          <S.EmptyText>
            Ainda não existem solicitações de suporte
          </S.EmptyText>
        </S.EmptyContainer>
      )}

      {!isLoading && !empty && (
        <>
          <FlatList
            data={supports}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SupportCard support={item} />}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={true}
          />
          <SupportLegends />
        </>
      )}
    </ScreenContainer>
  );
}

