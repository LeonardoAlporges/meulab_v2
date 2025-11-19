import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@routes/types";

import { Header } from "./components/Header";
import { QuickAccessCarousel } from "./components/QuickAccessCarousel";
import { RuMenuCard } from "./components/RuMenuCard";
import { createQuickAccessItems } from "./quickAccessItems";
import * as S from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<NavigationProp>();

  const quickAccessItems = React.useMemo(
    () =>
      createQuickAccessItems({
        lessonSchedule: () => {
          navigation.navigate("LessonSchedule");
        },
        calendarioAcademico: () => {
          Alert.alert(
            "Calendário acadêmico",
            "Funcionalidade em desenvolvimento."
          );
        },
        // miniCurso: () => {
        //   Alert.alert("Mini curso", "Funcionalidade em desenvolvimento.");
        // },
        // biblioteca: () => {
        //   Alert.alert("Biblioteca", "Funcionalidade em desenvolvimento.");
        // },
        // eventos: () => {
        //   Alert.alert("Eventos", "Funcionalidade em desenvolvimento.");
        // },
        // suporte: () => {
        //   Alert.alert("Suporte", "Funcionalidade em desenvolvimento.");
        // },
        solicitarSuporte: () => {
          navigation.navigate("SolicitarSuporte");
        },
        reservaSala: () => {
          navigation.navigate("RoomReservationTerms");
        },
        sejaMonitor: () => {
          navigation.navigate("SejaMonitor");
        },
        contatoDev: () => {
          navigation.navigate("ContatoDesenvolvedor");
        },
        gradeSistemas: () => {
          navigation.navigate("CurriculumSI");
        },
        mapaUfes: () => {
          navigation.navigate("MapUfes");
        },
        siteCasi: () => {
          navigation.navigate("SiteCasi");
        },
        horariosMonitores: () => {
          navigation.navigate("MonitorSchedulesLab");
        },
      }),
    [navigation]
  );

  return (
    <S.Container contentContainerStyle={S.contentContainerStyle}>
      <Header />

      <QuickAccessCarousel items={quickAccessItems} />

      <RuMenuCard />
    </S.Container>
  );
}
