import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, ScreenContainer } from "@components/index";
import { RootStackParamList } from "@routes/types";

import * as S from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const CHI_CHIU_PDF_URL =
  "http://docs.google.com/gview?embedded=true&url=https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/Instruc%CC%A7a%CC%83o%20Normativa%20N%C2%BA%20021%20-%20Laboratorios%20Chichiu%20%20DCOMP%20(Assinado).pdf?alt=media&token=3bcbb079-b600-45a2-8a61-ac6195bfb118&_gl=1*1pwf4fl*_ga*MjA3NDg0NzI4MC4xNjc4NTQ1ODEy*_ga_CW55HF8NVT*MTY4NjAyMDcxMS4xNS4xLjE2ODYwMjA3NTIuMC4wLjA.pdf";

const REUNI_PDF_URL =
  "http://docs.google.com/gview?embedded=true&url=https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/Instruc%CC%A7a%CC%83o%20Normativa%20N%C2%BA%20020%20-%20Laborato%CC%81rios%20de%20Desenvolvimento%20de%20Sistemas%20%20DCOMP%20(Assinado).pdf?alt=media&token=c6ecb0f5-97a7-4e3c-8e82-b944c3af90b9&_gl=1*1bdq1pv*_ga*MjA3NDg0NzI4MC4xNjc4NTQ1ODEy*_ga_CW55HF8NVT*MTY4NjAyMDcxMS4xNS4xLjE2ODYwMjA5MTEuMC4wLjA.pdf";

export default function UsageRegulation() {
  const navigation = useNavigation<NavigationProp>();
  const [openWebViewChiuChiu, setOpenWebViewChiuChiu] = useState(false);
  const [openWebViewReuni, setOpenWebViewReuni] = useState(false);

  const handleGoBack = () => {
    if (openWebViewChiuChiu || openWebViewReuni) {
      setOpenWebViewChiuChiu(false);
      setOpenWebViewReuni(false);
    } else {
      navigation.goBack();
    }
  };

  if (openWebViewChiuChiu) {
    return (
      <ScreenContainer
        scrollable={false}
        goBack={true}
        previousScreenName="Home"
        title="Regulamento Chi-Chiu"
        onPressBackCustom={handleGoBack}
      >
        <S.WebViewContainer>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: CHI_CHIU_PDF_URL }}
            startInLoadingState={true}
          />
        </S.WebViewContainer>
      </ScreenContainer>
    );
  }

  if (openWebViewReuni) {
    return (
      <ScreenContainer
        scrollable={false}
        goBack={true}
        previousScreenName="Home"
        title="Regulamento REUNI"
        onPressBackCustom={handleGoBack}
      >
        <S.WebViewContainer>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: REUNI_PDF_URL }}
            startInLoadingState={true}
          />
        </S.WebViewContainer>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Regulamento de Utilização"
    >
      <S.ContentContainer>
        <S.Title>Regulamento de Utilização</S.Title>

        <S.TextOne>
          Para utilização das salas de laboratórios, leia com atenção os
          regulamentos a seguir, de acordo com o bloco de laboratórios do
          campus UFES de Alegre.
        </S.TextOne>

        <S.ButtonsContainer>
          <Button
            onPress={() => setOpenWebViewChiuChiu(true)}
            title="Regulamento laboratórios Chi-Chiu"
            type="PRIMARY"
            marginTop={16}
          />

          <Button
            onPress={() => setOpenWebViewReuni(true)}
            title="Regulamento laboratórios REUNI"
            type="PRIMARY"
            marginTop={16}
          />
        </S.ButtonsContainer>
      </S.ContentContainer>
    </ScreenContainer>
  );
}

