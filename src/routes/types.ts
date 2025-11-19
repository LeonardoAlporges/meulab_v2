import { DrawerNavigationProp as DrawerNavProp } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Reservation } from "@services/reservationService/types";

// Types for each screen's params
export type RootStackParamList = {
  Home: NavigatorScreenParams<DrawerParamList>;
  UsageRegulation: undefined;
  Infrastructure: undefined;
  Contact: undefined;
  LabFiveUsage: undefined;
  SolicitarSuporte: undefined;
  SupportForm: undefined;
  SupportRequests: undefined;
  SupportDetails: { id?: string };
  OccurrenceForm: undefined;
  OccurrenceRequests: undefined;
  OccurrenceDetails: { id?: string };
  Notificacoes: undefined;
  SejaMonitor: undefined;
  AlterarCoordenador: undefined;
  CurriculumSI: undefined;
  ContatoDesenvolvedor: undefined;
  MapUfes: undefined;
  LessonSchedule: undefined;
  SiteCasi: undefined;
  MonitorList: undefined;
  MonitorSchedules: { monitorId?: number } | undefined;
  RegistraNotificacao: undefined;
  MonitorSchedulesLab: undefined;
  RoomReservationTerms: undefined;
  RoomReservationForm: undefined;
  RoomReservationList: undefined;
  RoomReservationDetails: { reservation?: Reservation } | undefined;
  RegistraOcorrencia?: undefined;
  RegistrosDeOcorrencia?: undefined;
  MonitoramentoDeReserva?: undefined;
  DetalhesReserva?: { item?: unknown };
};

export type DrawerParamList = {
  Menu: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

// Export types for use in components
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
export type DrawerNavigationProp = DrawerNavProp<DrawerParamList>;
export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;
