export interface Monitor {
  id: number;
  username?: string;
  name?: string;
  registrationNumber?: string;
  [key: string]: any;
}

export interface ImportMonitorRequest {
  fileBase64: string;
}

export interface MonitorScheduleHour {
  username: string;
  dayWeekId: number;
  hour: number;
}

export interface MonitorSchedules {
  monday?: MonitorScheduleHour[];
  tuesday?: MonitorScheduleHour[];
  wednesday?: MonitorScheduleHour[];
  thursday?: MonitorScheduleHour[];
  friday?: MonitorScheduleHour[];
}

export interface UpdateMonitorScheduleRequest {
  mondayHours?: number[];
  tuesdayHours?: number[];
  wednesdayHours?: number[];
  thursdayHours?: number[];
  fridayHours?: number[];
}

export interface MonitorSchedulePublicHour {
  id?: number;
  username: string;
  dayWeekId?: number;
  hour: string;
  status?: "available";
}

export interface MonitorSchedulesPublic {
  monday?: MonitorSchedulePublicHour[];
  tuesday?: MonitorSchedulePublicHour[];
  wednesday?: MonitorSchedulePublicHour[];
  thursday?: MonitorSchedulePublicHour[];
  friday?: MonitorSchedulePublicHour[];
}

