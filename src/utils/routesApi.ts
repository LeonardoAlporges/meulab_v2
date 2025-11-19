// ============================================
// API ROUTES
// ============================================

export const routes = {
  // User Service
  user: {
    base: "/user",
    login: "/user/login/",
    loginWatchman: "/user/login/watchman/",
    verify: "/user/verify",
    logout: "/user/loggout/userId",
    defineCoordinator: "/user/defineCoordinato",
    removeCoordinator: (idCoordenador: string | number) =>
      `/user/removeCoordinator/${idCoordenador}`,
    coordinatorList: "/user/coordinatorList/",
  },

  // Monitor Service
  monitor: {
    base: "/monitor",
    list: "/monitor",
    delete: (idMonitor: string | number) => `/monitor/${idMonitor}`,
    timeMonitor: (idMonitor: string | number) =>
      `/monitor/timeMonitor/${idMonitor}`,
    timesMonitor: "/monitor/timesMonitor",
    timesMonitorOverlap: (idMonitor: string | number) =>
      `/monitor/timesMonitorOverlap/${idMonitor}`,
    updateTime: (idMonitor: string | number) => `/monitor/${idMonitor}`,
    deleteAll: (idCoordenador: string | number) =>
      `/monitor/all/${idCoordenador}`,
    import: "/monitor/import",
    importSchedule: "/monitor/import/schedule",
  },

  // Reservation Service
  reservation: {
    base: "/reservation",
    getByUser: (idUser: string | number) => `/reservation/${idUser}`,
    delivered: (idReserva: string | number) =>
      `/reservation/delivered/${idReserva}`,
    returned: (idReserva: string | number) =>
      `/reservation/returned/${idReserva}`,
    analysis: "/reservation/analisy",
  },

  // Occurrence Service
  occurrence: {
    base: "/occurrence",
    getById: (idMonitor: string | number) => `/occurrence/${idMonitor}`,
    analysis: (idOcorrencia: string | number) =>
      `/occurrence/analysis/${idOcorrencia}`,
    delete: (idOcorrencia: string | number) => `/occurrence/${idOcorrencia}`,
    resolve: (idOcorrencia: string | number) =>
      `/occurrence/resolve/${idOcorrencia}`,
  },

  // Support Service
  support: {
    base: "/suport",
    create: "/suport",
    getAll: "/suport",
    getById: (idUser: string | number) => `/suport/${idUser}`,
    analysis: (idSuporte: string | number) => `/suport/analysis/${idSuporte}`,
    delete: (idSuporte: string | number) => `/suport/${idSuporte}`,
    resolve: (idSuporte: string | number) => `/suport/resolve/${idSuporte}`,
    feedback: "/suport/feedback",
  },

  // Notification Service
  notification: {
    base: "/notification",
    delete: (idNotificao: string | number) => `/notification/${idNotificao}`,
    user: (id_user: string | number) => `/notification/user/${id_user}`,
    userNumber: (id_user: string | number) =>
      `/notification/user/number/${id_user}`,
  },

  ru: {
    base: "/ru",
    getRuMenu: (dateISO: string) => `/ru/cardapio?date=${dateISO}`,
  },
} as const;
