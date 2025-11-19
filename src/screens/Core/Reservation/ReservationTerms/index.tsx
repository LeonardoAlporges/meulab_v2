import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import { WebView } from "react-native-webview";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { useAuth } from "@context/AuthContext";
import { RootStackParamList } from "@routes/types";

import * as S from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const CHI_CHIU_PDF_URL =
  "http://docs.google.com/gview?embedded=true&url=https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/Instruc%CC%A7a%CC%83o%20Normativa%20N%C2%BA%20021%20-%20Laboratorios%20Chichiu%20%20DCOMP%20(Assinado).pdf?alt=media&token=3bcbb079-b600-45a2-8a61-ac6195bfb118&_gl=1*1pwf4fl*_ga*MjA3NDg0NzI4MC4xNjc4NTQ1ODEy*_ga_CW55HF8NVT*MTY4NjAyMDcxMS4xNS4xLjE2ODYwMjA3NTIuMC4wLjA.pdf";

const REUNI_PDF_URL =
  "http://docs.google.com/gview?embedded=true&url=https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/Instruc%CC%A7a%CC%83o%20Normativa%20N%C2%BA%20020%20-%20Laborato%CC%81rios%20de%20Desenvolvimento%20de%20Sistemas%20%20DCOMP%20(Assinado).pdf?alt=media&token=c6ecb0f5-97a7-4e3c-8e82-b944c3af90b9&_gl=1*1bdq1pv*_ga*MjA3NDg0NzI4MC4xNjc4NTQ1ODEy*_ga_CW55HF8NVT*MTY4NjAyMDcxMS4xNS4xLjE2ODYwMjA5MTEuMC4wLjA.pdf";

export default function RoomReservationTerms() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();

  const [termAccepted, setTermAccepted] = useState(false);
  const [openWebViewChiuChiu, setOpenWebViewChiuChiu] = useState(false);
  const [openWebViewReuni, setOpenWebViewReuni] = useState(false);

  const canRequestReservation = useMemo(() => user?.id !== undefined, [user]);
  const isProceedDisabled = termAccepted === false;

  const handleGoBack = () => {
    if (openWebViewChiuChiu || openWebViewReuni) {
      setOpenWebViewChiuChiu(false);
      setOpenWebViewReuni(false);
      return;
    }
    navigation.goBack();
  };

  const handleProceed = () => {
    if (!termAccepted) {
      Alert.alert(
        "Atenção",
        "Você precisa aceitar os termos antes de continuar."
      );
      return;
    }
    navigation.navigate("RoomReservationForm");
  };

  const handleViewReservations = () => {
    navigation.navigate("RoomReservationList");
  };

  if (openWebViewChiuChiu) {
    return (
      <ScreenContainer
        scrollable={false}
        goBack={true}
        previousScreenName="Home"
        title="Normativa Chi-Chiu"
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
        title="Normativa REUNI"
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
      title="Reserva de Sala"
    >
      <InfoCard
        icon="meeting-room"
        description="Verifique o regulamento de utilização antes de solicitar uma reserva. A coordenação irá analisar sua solicitação considerando a disponibilidade oficial dos laboratórios."
      />

      <S.ContentContainer>
        <S.Title>Reserva de Sala</S.Title>
        <S.TextOne>
          A solicitação não garante a reserva. É necessária a confirmação da
          coordenação, que avaliará a disponibilidade desejada de acordo com as
          atividades previamente agendadas.
        </S.TextOne>

        <S.TextThree>
          Antes de reservar uma sala no prédio Chi-Chiu leia atentamente o
          regulamento:
        </S.TextThree>
        <Button
          title="Instruções normativas Chi-Chiu"
          onPress={() => setOpenWebViewChiuChiu(true)}
          type="PRIMARY"
          marginTop={12}
        />

        <S.TextThree>Para reservas no prédio REUNI:</S.TextThree>
        <S.TextOne>
          Segundo a Instrução Normativa Nº 20 do Departamento de Computação, as
          salas podem ser requisitadas para atividades de pesquisa, extensão e
          eventos que demandem o uso de laboratórios de informática. Leia o
          capítulo VII para seguir todos os procedimentos necessários.
        </S.TextOne>

        <Button
          title="Instruções normativas REUNI"
          onPress={() => setOpenWebViewReuni(true)}
          type="PRIMARY"
          marginTop={12}
        />

        <Button
          title="Acompanhar solicitações"
          onPress={handleViewReservations}
          type="SECONDARY"
          marginTop={16}
        />

        {canRequestReservation && (
          <>
            <S.TextThree>
              Para prosseguir com o agendamento, confirme que leu e aceita os
              termos abaixo:
            </S.TextThree>
            <S.CheckboxContainer>
              <Checkbox
                value={termAccepted}
                onValueChange={setTermAccepted}
                color={termAccepted ? "#143359" : undefined}
              />
              <S.CheckboxText>
                Eu confirmo que li e aceito os termos e condições para reserva
                de laboratório.
              </S.CheckboxText>
            </S.CheckboxContainer>

            <Button
              title="Prosseguir para reserva"
              onPress={handleProceed}
              type="PRIMARY"
              marginTop={16}
              disabled={isProceedDisabled}
              style={isProceedDisabled ? { opacity: 0.5 } : undefined}
            />
          </>
        )}
      </S.ContentContainer>
    </ScreenContainer>
  );
}
