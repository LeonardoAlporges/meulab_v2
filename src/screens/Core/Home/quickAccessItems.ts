export interface QuickAccessItem {
  title: string;
  icon: string;
  route: string;
  onPress: () => void;
}

export const createQuickAccessItems = (
  handlers: Record<string, () => void>
): QuickAccessItem[] => [
  {
    title: "Horários de aula",
    icon: "calendar-clock",
    route: "HorariosAula",
    onPress: handlers.horariosAula || (() => {}),
  },
  {
    title: "Calendário acadêmico",
    icon: "calendar-month",
    route: "CalendarioAcademico",
    onPress: handlers.calendarioAcademico || (() => {}),
  },
  {
    title: "Mini curso",
    icon: "school",
    route: "MiniCurso",
    onPress: handlers.miniCurso || (() => {}),
  },
  {
    title: "Biblioteca",
    icon: "book-open-variant",
    route: "Biblioteca",
    onPress: handlers.biblioteca || (() => {}),
  },
  {
    title: "Eventos",
    icon: "calendar-star",
    route: "Eventos",
    onPress: handlers.eventos || (() => {}),
  },
  {
    title: "Suporte",
    icon: "help-circle",
    route: "Suporte",
    onPress: handlers.suporte || (() => {}),
  },
  {
    title: "Solicitar Suporte",
    icon: "support-agent",
    route: "SolicitarSuporte",
    onPress: handlers.solicitarSuporte || (() => {}),
  },
  {
    title: "Horários Monitores",
    icon: "schedule",
    route: "MonitorSchedulesLab",
    onPress: handlers.horariosMonitores || (() => {}),
  },
];

