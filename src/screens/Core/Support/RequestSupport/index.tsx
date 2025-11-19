import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { RootStackParamList } from "@routes/types";

import * as S from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function RequestSupport() {
  const navigation = useNavigation<NavigationProp>();
  const [termAccepted, setTermAccepted] = useState(false);

  const handleRequestSupport = () => {
    if (termAccepted) {
      navigation.navigate("SupportForm");
    }
  };

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Solicitar Suporte"
    >
      <InfoCard
        icon="info"
        description="Utilize a solicitação de suporte técnico para relatar problemas e realizar solicitações."
      />

      <S.ContentContainer>
        <S.Title>Solicitação de Suporte</S.Title>

        <S.TextOne>
          Utilize a solicitação de suporte técnico para relatar problemas,
          realizar solicitações/sugestões/reclamações, tais como:
        </S.TextOne>

        <S.RequirementsList>
          <S.RequirementItem>
            <S.RequirementIcon name="computer" />
            <S.RequirementText>
              Máquinas com algum tipo de defeito
            </S.RequirementText>
          </S.RequirementItem>

          <S.RequirementItem>
            <S.RequirementIcon name="event-seat" />
            <S.RequirementText>
              Problemas com mobiliário (quadros, cadeiras, mesas, etc)
            </S.RequirementText>
          </S.RequirementItem>

          <S.RequirementItem>
            <S.RequirementIcon name="report-problem" />
            <S.RequirementText>
              Softwares com mal funcionamento
            </S.RequirementText>
          </S.RequirementItem>

          <S.RequirementItem>
            <S.RequirementIcon name="download" />
            <S.RequirementText>
              Solicitação de instalação de programas
            </S.RequirementText>
          </S.RequirementItem>

          <S.RequirementItem>
            <S.RequirementIcon name="devices" />
            <S.RequirementText>
              Equipamento auxiliar defeituoso (datashow, ar-condicionado,
              estabilizadores, etc)
            </S.RequirementText>
          </S.RequirementItem>

          <S.RequirementItem>
            <S.RequirementIcon name="build" />
            <S.RequirementText>
              Infraestrutura (luz, energia, limpeza, internet, cabeamento, etc)
            </S.RequirementText>
          </S.RequirementItem>
        </S.RequirementsList>

        <S.ImportantNote>
          <S.ImportantIcon name="info" />
          <S.ImportantText>
            Em caso de problemas com computadores, por favor, anote o número de
            identificação da máquina (caso não tenha, pelo menos a sua posição
            no local) e qual laboratório se encontra.
          </S.ImportantText>
        </S.ImportantNote>

        <S.CheckboxContainer>
          <Checkbox
            value={termAccepted}
            onValueChange={setTermAccepted}
            color={termAccepted ? "#143359" : undefined}
          />
          <S.CheckboxText>Estou de acordo com as informações acima</S.CheckboxText>
        </S.CheckboxContainer>

        <Button
          onPress={handleRequestSupport}
          title="Solicitar Suporte"
          type="PRIMARY"
          marginTop={16}
          disabled={!termAccepted}
        />
      </S.ContentContainer>
    </ScreenContainer>
  );
}

