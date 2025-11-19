import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert } from "react-native";
import { WebView } from "react-native-webview";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { RootStackParamList } from "@routes/types";

import * as S from "./styles";

const MONITOR_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScXS9upXAQMk3LM5kdKetwVx84URVAyQTPjvQv-Oy0oJCDw9A/viewform";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MonitorApplication() {
  const navigation = useNavigation<NavigationProp>();
  const [termAccepted, setTermAccepted] = useState(false);
  const [openWebView, setOpenWebView] = useState(false);

  const handleGoBack = () => {
    if (openWebView) {
      setOpenWebView(false);
      return;
    }
    navigation.goBack();
  };

  const handleVerifyTerms = () => {
    if (termAccepted) {
      setOpenWebView(true);
      return;
    }
    Alert.alert("Atenção", "Você precisa aceitar os termos antes de continuar.");
  };

  if (openWebView) {
    return (
      <ScreenContainer
        scrollable={false}
        goBack={true}
        previousScreenName="Home"
        title="Formulário de Monitoria"
        onPressBackCustom={handleGoBack}
      >
        <S.WebViewWrapper>
          <WebView
            source={{ uri: MONITOR_FORM_URL }}
            style={{ flex: 1 }}
            startInLoadingState={true}
          />
        </S.WebViewWrapper>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Seja um Monitor"
    >
      <InfoCard
        icon="volunteer-activism"
        description="Conheça os termos da monitoria voluntária e candidate-se para apoiar o Laboratório 5."
      />

      <S.ContentContainer>
        <S.Title>- Para candidatar-se a monitor</S.Title>

        <S.TextOne>
          A monitoria voluntária técnica oferece suporte aos usuários do
          Laboratório 5, destinado a estudos e pesquisas dos cursos de Ciência da
          Computação e Sistemas de Informação. O monitor será responsável por:
        </S.TextOne>

        <S.TextList>
          • Supervisionar o uso do laboratório pelos usuários{"\n"}
          {"\n"}• Relatar mau uso ou problemas em equipamentos para a Coordenação
          de Laboratório{"\n"}
          {"\n"}• Auxiliar no uso de softwares instalados{"\n"}
          {"\n"}• Instalar ou manter softwares solicitados pela Coordenação de
          Laboratórios ou professores
        </S.TextList>

        <S.TextOne>
          Como atividade voluntária, é necessário cumprir ao menos 4 horas
          semanais para, ao final do semestre, receber 50 horas de Atividades
          Complementares, conforme regulamento do Departamento de Computação.
        </S.TextOne>

        <S.TextThree>
          Observação: Horários disponíveis de segunda a sexta, das 08h às 12h e
          das 13h às 22h. Informe toda a sua disponibilidade para aumentar suas
          chances de alocação.
        </S.TextThree>

        <S.CheckboxContainer>
          <Checkbox
            value={termAccepted}
            onValueChange={setTermAccepted}
            color={termAccepted ? "#143359" : undefined}
          />
          <S.CheckboxText>Eu aceito os termos e condições</S.CheckboxText>
        </S.CheckboxContainer>

        <Button
          title="Candidatar-se"
          onPress={handleVerifyTerms}
          type="PRIMARY"
          marginTop={24}
        />
      </S.ContentContainer>
    </ScreenContainer>
  );
}

