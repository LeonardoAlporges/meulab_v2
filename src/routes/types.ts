import { DrawerNavigationProp as DrawerNavProp } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Types for each screen's params
export type RootStackParamList = {
    Home: NavigatorScreenParams<DrawerParamList>;
    SejaMonitor: undefined;
    ReservaSala: undefined;
    UsageRegulation: undefined;
    SuporteTecnico: undefined;
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
    Solicitacoes: undefined;
    RegistraOcorrencia: undefined;
    RegistrosDeOcorrencia: undefined;
    MonitoramentoDeOcorrencia: undefined;
    MonitoramentoDeSuporte: undefined;
    DetalhesSuporte: { id?: string };
    DetalhesOcorrencia: { id?: string };
    MonitorList: undefined;
    DetalhesMonitor: { id?: string };
    MonitorSchedules: { monitorId?: number } | undefined;
    RegistraNotificacao: undefined;
    Notificacoes: undefined;
    SolicitarCartao: undefined;
    SolicitacaoReserva: undefined;
    DetalhesReserva: { item?: unknown };
    AlterarCoordenador: undefined;
    MonitoramentoDeReserva: undefined;
    ContatoDesenvolvedor: undefined;
    ListaCoordenadores: undefined;
    MonitorSchedulesLab: undefined;
};

export type DrawerParamList = {
    Menu: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
};

// Export types for use in components
export type RootStackNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
export type DrawerNavigationProp = DrawerNavProp<DrawerParamList>;
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
