import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { InfoCard, ScreenContainer } from "@components/index";
import { RootStackParamList } from "@routes/types";

import { OccurrenceCard, OccurrenceLegends } from "./components";
import * as S from "./styles";
import { useOccurrenceRequests } from "./useOccurrenceRequests";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function OccurrenceRequests() {
  const navigation = useNavigation<NavigationProp>();
  const { occurrences, empty, isLoading } = useOccurrenceRequests();

  return (
    <ScreenContainer
      scrollable={false}
      goBack={true}
      previousScreenName="Home"
      title="Ocorrências Registradas"
    >
      <InfoCard
        icon="info"
        description="Acompanhe o status das ocorrências. Em até 2 dias úteis o coordenador responsável irá analisar."
      />

      {!isLoading && empty && (
        <S.EmptyContainer>
          <S.EmptyText>
            Ainda não existem ocorrências registradas
          </S.EmptyText>
        </S.EmptyContainer>
      )}

      {!isLoading && !empty && (
        <>
          <FlatList
            data={occurrences}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <OccurrenceCard occurrence={item} />}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={true}
          />
          <OccurrenceLegends />
        </>
      )}
    </ScreenContainer>
  );
}

