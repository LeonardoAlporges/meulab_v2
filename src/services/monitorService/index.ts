import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";
import {
  ImportMonitorRequest,
  ImportScheduleRequest,
  Monitor,
  MonitorSchedules,
  MonitorSchedulesPublic,
  UpdateMonitorScheduleRequest,
} from "./types";

const listMonitores = async () => {
  return await apiInstance.get<Monitor[]>(routes.monitor.list);
};

const importMonitor = async (data: ImportMonitorRequest) => {
  return await apiInstance.post<void>(routes.monitor.import, data);
};

const importSchedule = async (data: ImportScheduleRequest) => {
  return await apiInstance.post<void>(routes.monitor.importSchedule, data);
};

const deleteMonitor = async (idMonitor: string | number) => {
  return await apiInstance.remove<void>(routes.monitor.delete(idMonitor));
};

const deleteAllMonitores = async (idCoordenador: string | number) => {
  return await apiInstance.remove<void>(
    routes.monitor.deleteAll(idCoordenador)
  );
};

const getMonitorSchedules = async (idMonitor: string | number) => {
  return await apiInstance.get<MonitorSchedules>(
    `${routes.monitor.timeMonitor(idMonitor)}?idMonitor=${idMonitor}`
  );
};

const updateMonitorSchedule = async (
  idMonitor: string | number,
  data: UpdateMonitorScheduleRequest
) => {
  return await apiInstance.put<void>(routes.monitor.updateTime(idMonitor), data);
};

const updateMonitorScheduleWithOverlap = async (
  idMonitor: string | number,
  data: UpdateMonitorScheduleRequest
) => {
  return await apiInstance.put<void>(
    routes.monitor.timesMonitorOverlap(idMonitor),
    data
  );
};

const getPublicMonitorSchedules = async () => {
  return await apiInstance.get<MonitorSchedulesPublic>(
    routes.monitor.timesMonitor
  );
};

export const monitorService = {
  listMonitores,
  importMonitor,
  importSchedule,
  deleteMonitor,
  deleteAllMonitores,
  getMonitorSchedules,
  updateMonitorSchedule,
  updateMonitorScheduleWithOverlap,
  getPublicMonitorSchedules,
};
