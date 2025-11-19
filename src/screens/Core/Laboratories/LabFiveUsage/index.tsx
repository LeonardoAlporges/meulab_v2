import { useNavigation } from "@react-navigation/native";
import React from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { RootStackParamList } from "@routes/types";

import * as S from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function LabFiveUsage() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Utilização do Laboratório 05"
    >
      <InfoCard
        icon="info"
        description="Informações sobre o uso do Laboratório 05 - Prédio REUNI."
      />

      <S.ContentContainer>
        <S.Title>Utilização do laboratório 05</S.Title>

        <S.TextOne>
          O Laboratório 05 – Prédio REUNI é destinado somente aos alunos e
          professores dos cursos de Ciência da Computação e Sistemas de
          Informação, para estudos, pesquisas, projetos e TCCs. Seu uso está
          condicionado à presença dos monitores técnicos no local (clique aqui
          para verificar os horários), porém, em caso particular, deverá ser
          solicitado à Coordenação de Laboratórios.
        </S.TextOne>

        <S.TextOne>
          Em todos os casos, por favor, leia com atenção ao Regulamento abaixo
          para os procedimentos de uso e solicitação particular da sala.
        </S.TextOne>

        <S.RequirementsList>
          <S.RequirementItem>
            <S.RequirementIcon name="description" />
            <S.RequirementText>
              Acesse o REGULAMENTO DE USO DO LAB. 05
            </S.RequirementText>
          </S.RequirementItem>
          <S.RequirementItem>
            <S.RequirementIcon name="download" />
            <S.RequirementText>Baixar o TERMO DE COMPROMISSO</S.RequirementText>
          </S.RequirementItem>
        </S.RequirementsList>

        <S.ButtonsContainer>
          <Button
            onPress={() => navigation.navigate("UsageRegulation")}
            title="Regulamento de uso"
            type="PRIMARY"
            marginTop={16}
          />

          <Button
            onPress={() => navigation.navigate("MonitorSchedulesLab")}
            title="Horários Disponíveis"
            type="PRIMARY"
            marginTop={16}
          />
        </S.ButtonsContainer>
      </S.ContentContainer>
    </ScreenContainer>
  );
}

