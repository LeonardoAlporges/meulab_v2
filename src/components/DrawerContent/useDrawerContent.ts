import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";

import { useAuth } from "@context/AuthContext";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

import { MenuItem } from "./types";

export const useDrawerContent = () => {
  const navigation = useNavigation<DrawerContentComponentProps["navigation"]>();
  const { user, logout } = useAuth();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleNavigate = useCallback(
    (screen: string) => {
      navigation.navigate(screen);
    },
    [navigation]
  );

  const toggleMenu = useCallback((menuKey: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const menuConfig: MenuItem[] = useMemo(
    () => [
      {
        key: "coordinator",
        title: "Coordenador",
        icon: "workspace-premium",
        condition: user?.isCoordinator,
        items: [
          {
            title: "Monitoramento de Ocorrência",
            screen: "OccurrenceRequests",
          },
          {
            title: "Monitoramento de Suporte",
            screen: "SupportRequests",
          },
          {
            title: "Monitoramento de Reservas",
            screen: "MonitoramentoDeReserva",
          },
          { title: "Monitores", screen: "MonitorList" },
          { title: "Horários Monitores", screen: "MonitorSchedulesLab" },
          { title: "Enviar Notificação", screen: "RegistraNotificacao" },
        ],
      },
      {
        key: "monitor",
        title: "Monitor",
        icon: "badge",
        condition: user?.isMonitor,
        items: [
          { title: "Verificar horários", screen: "MonitorSchedules" },
          { title: "Registrar Ocorrência", screen: "OccurrenceForm" },
          {
            title: "Registros de Ocorrências",
            screen: "OccurrenceRequests",
          },
        ],
      },
      {
        key: "lab",
        title: "Laboratórios",
        icon: "science",
        condition: true,
        items: [
          { title: "Uso Laboratório 05", screen: "LabFiveUsage" },
          { title: "Infraestrutura Geral", screen: "Infrastructure" },
          { title: "Contato", screen: "Contact" },
          {
            title: "Regulamento de Utilização",
            screen: "UsageRegulation",
          },
        ],
      },
      {
        key: "reservation",
        title: "Reserva de Sala",
        icon: "meeting-room",
        condition: user?.isWatchman,
        items: [
          { title: "Solicitar Cartão Magnético", screen: "ReservaSala" },
          { title: "Verificar Reservas", screen: "MonitoramentoDeReserva" },
        ],
      },
              {
                key: "user",
                title: "Ajuda",
                icon: "help-center",
                condition: true,
                items: [
                  { title: "Solicitar Suporte", screen: "SolicitarSuporte" },
                  { title: "Solicitações de Suporte", screen: "SupportRequests" },
                ],
              },
    ],
    [user]
  );

  return {
    user,
    openMenus,
    handleNavigate,
    toggleMenu,
    menuConfig,
    handleLogout,
  };
};
