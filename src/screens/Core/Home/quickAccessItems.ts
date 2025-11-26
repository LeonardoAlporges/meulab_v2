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
    title: "Horários de aula SI",
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
  {
    title: "Listagem de Reservas",
    icon: "format-list-bulleted",
    route: "RoomReservationList",
    onPress: handlers.listagemReservas || (() => {}),
  },
];

// Itens principais para o acesso rápido (carrossel)
// Para watchman: 1. Listagem de Reservas, 2. Horários Monitores, 3. Mapa UFES, 4. Solicitar Suporte
// Para coordenador: 1. Listagem de Reservas, 2. Horários Monitores, 3. Mapa UFES, 4. Solicitar Suporte
// Para usuário comum: 1. Horários Monitores, 2. Mapa UFES, 3. Solicitar Suporte, 4. Reserva de Sala
export const getMainQuickAccessItems = (
  allItems: QuickAccessItem[],
  isWatchman: boolean = false,
  isCoordinator: boolean = false
): QuickAccessItem[] => {
  let orderedRoutes: string[];

  if (isWatchman || isCoordinator) {
    // Ordem para watchman e coordenador
    orderedRoutes = [
      "RoomReservationList", // 1º - Listagem de Reservas
      "MonitorSchedulesLab", // 2º - Horários do laboratório
      "MapUfes", // 3º - Mapa UFES
      "SolicitarSuporte", // 4º
    ];
  } else {
    // Ordem para usuário comum
    orderedRoutes = [
      "MonitorSchedulesLab", // 1º - Horários do laboratório
      "MapUfes", // 2º - Mapa UFES
      "SolicitarSuporte", // 3º
      "RoomReservationTerms", // 4º
    ];
  }

  const filtered = allItems.filter((item) =>
    orderedRoutes.includes(item.route)
  );

  return orderedRoutes
    .map((route) => filtered.find((item) => item.route === route))
    .filter((item): item is QuickAccessItem => item !== undefined);
};

// Itens restantes para a grid de serviços
// Ocultar: Mini curso, Biblioteca, Eventos, Contato Dev, Calendário acadêmico
// Listagem de Reservas só aparece para coordenador e vigilante
export const getRemainingItems = (
  allItems: QuickAccessItem[],
  mainItems: QuickAccessItem[],
  isWatchman: boolean = false,
  isCoordinator: boolean = false
): QuickAccessItem[] => {
  const mainRoutes = mainItems.map((item) => item.route);
  const hiddenRoutes = [
    "MiniCurso",
    "Biblioteca",
    "Eventos",
    "ContatoDesenvolvedor",
    "CalendarioAcademico",
    "LessonSchedule", // Já está no featured card
  ];

  // Se não for watchman nem coordenador, ocultar Listagem de Reservas
  if (!isWatchman && !isCoordinator) {
    hiddenRoutes.push("RoomReservationList");
  }

  return allItems.filter(
    (item) =>
      !mainRoutes.includes(item.route) && !hiddenRoutes.includes(item.route)
  );
};
