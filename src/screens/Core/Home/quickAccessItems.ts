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
    route: "LessonSchedule",
    onPress: handlers.lessonSchedule || (() => {}),
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
    icon: "account-voice",
    route: "SolicitarSuporte",
    onPress: handlers.solicitarSuporte || (() => {}),
  },
  {
    title: "Reserva de Sala",
    icon: "door-open",
    route: "RoomReservationTerms",
    onPress: handlers.reservaSala || (() => {}),
  },
  {
    title: "Seja Monitor",
    icon: "account-school",
    route: "SejaMonitor",
    onPress: handlers.sejaMonitor || (() => {}),
  },
  {
    title: "Contato Dev",
    icon: "email-edit-outline",
    route: "ContatoDesenvolvedor",
    onPress: handlers.contatoDev || (() => {}),
  },
  {
    title: "Grade Sistemas",
    icon: "book-outline",
    route: "CurriculumSI",
    onPress: handlers.gradeSistemas || (() => {}),
  },
  {
    title: "Mapa UFES",
    icon: "map",
    route: "MapUfes",
    onPress: handlers.mapaUfes || (() => {}),
  },
  {
    title: "Site do CASI",
    icon: "web",
    route: "SiteCasi",
    onPress: handlers.siteCasi || (() => {}),
  },
  {
    title: "Horários Monitores",
    icon: "clock-outline",
    route: "MonitorSchedulesLab",
    onPress: handlers.horariosMonitores || (() => {}),
  },
];

