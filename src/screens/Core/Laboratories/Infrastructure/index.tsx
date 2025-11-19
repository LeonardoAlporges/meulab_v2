import { useNavigation } from "@react-navigation/native";
import React from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { RootStackParamList } from "@routes/types";

import * as S from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Infrastructure() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Infraestrutura"
    >
      <InfoCard
        icon="info"
        description="Informações sobre a infraestrutura das salas de laboratório."
      />

      <S.ContentContainer>
        <S.Title>Infraestrutura das Salas</S.Title>

        <S.TextOne>
          Todas as salas são munidas com ar-condicionado, quadro branco,
          datashow, acesso à internet em todas as máquinas, e um computador para
          o professor. Número de computadores por sala:
        </S.TextOne>

        <S.BuildingSection>
          <S.BuildingTitle>
            <S.BuildingIcon name="business" />
            <S.TextThree>Prédio Chi-Chiu:</S.TextThree>
          </S.BuildingTitle>

          <S.LabList>
            <S.LabItem>
              <S.LabIcon name="computer" />
              <S.LabText>Laboratório 01 = 40 computadores</S.LabText>
            </S.LabItem>
            <S.LabItem>
              <S.LabIcon name="computer" />
              <S.LabText>Laboratório 02 = 30 computadores</S.LabText>
            </S.LabItem>
            <S.LabItem>
              <S.LabIcon name="computer" />
              <S.LabText>Laboratório 03 = 30 computadores</S.LabText>
            </S.LabItem>
          </S.LabList>
        </S.BuildingSection>

        <S.BuildingSection>
          <S.BuildingTitle>
            <S.BuildingIcon name="business" />
            <S.TextThree>Prédio REUNI:</S.TextThree>
          </S.BuildingTitle>

          <S.LabList>
            <S.LabItem>
              <S.LabIcon name="computer" />
              <S.LabText>
                Laboratório 05, 06, 07, 08 = 20 computadores
              </S.LabText>
            </S.LabItem>
          </S.LabList>
        </S.BuildingSection>

        <S.TextOne style={{ marginTop: 16 }}>
          Para reservar uma sala clique no botão abaixo
        </S.TextOne>

        <Button
          onPress={() => navigation.navigate("RoomReservationTerms")}
          title="Reservar Sala"
          type="PRIMARY"
          marginTop={16}
        />
      </S.ContentContainer>
    </ScreenContainer>
  );
}

