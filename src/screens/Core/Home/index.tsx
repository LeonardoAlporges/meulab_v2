import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAuth } from "@context/AuthContext";
import { RootStackParamList } from "@routes/types";

import { AllServicesGrid } from "./components/AllServicesGrid";
import { FeaturedCard } from "./components/FeaturedCard";
import { Header } from "./components/Header";
import { QuickAccessCarousel } from "./components/QuickAccessCarousel";
import { RuMenuCard } from "./components/RuMenuCard";
import {
  createQuickAccessItems,
  getMainQuickAccessItems,
  getRemainingItems,
} from "./quickAccessItems";
import * as S from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();

  const allQuickAccessItems = React.useMemo(
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
        listagemReservas: () => {
          navigation.navigate("RoomReservationList");
        },
      }),
    [navigation]
  );

  const mainQuickAccessItems = React.useMemo(
    () =>
      getMainQuickAccessItems(
        allQuickAccessItems,
        user?.isWatchman || false,
        user?.isCoordinator || false
      ),
    [allQuickAccessItems, user?.isWatchman, user?.isCoordinator]
  );

  const remainingItems = React.useMemo(
    () =>
      getRemainingItems(
        allQuickAccessItems,
        mainQuickAccessItems,
        user?.isWatchman || false,
        user?.isCoordinator || false
      ),
    [
      allQuickAccessItems,
      mainQuickAccessItems,
      user?.isWatchman,
      user?.isCoordinator,
    ]
  );

  // Item destacado (Horários de Aula)
  const featuredItem = React.useMemo(
    () => allQuickAccessItems.find((item) => item.route === "LessonSchedule"),
    [allQuickAccessItems]
  );

  return (
    <S.Container contentContainerStyle={S.contentContainerStyle}>
      <Header />

      {featuredItem && <FeaturedCard item={featuredItem} />}

      <QuickAccessCarousel items={mainQuickAccessItems} />

      <RuMenuCard />

      {remainingItems.length > 0 && <AllServicesGrid items={remainingItems} />}
    </S.Container>
  );
}
