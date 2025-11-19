import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";
import {
  CreateOccurrenceRequest,
  Occurrence,
  UpdateOccurrenceStatusRequest,
} from "./types";

const createOccurrence = async (data: CreateOccurrenceRequest) => {
  return await apiInstance.post<Occurrence>(routes.occurrence.base, data);
};

const getAllOccurrences = async () => {
  return await apiInstance.get<Occurrence[]>(routes.occurrence.base);
};

const getOccurrenceByIdMonitor = async (idMonitor: string | number) => {
  return await apiInstance.get<Occurrence[]>(
    routes.occurrence.getById(idMonitor),
    { idMonitor }
  );
};

const setOccurrenceInAnalysis = async (idOccurrence: string | number) => {
  return await apiInstance.put<void>(
    routes.occurrence.analysis(idOccurrence),
    {},
    { idOccurrence }
  );
};

const deleteOccurrence = async (idOccurrence: string | number) => {
  return await apiInstance.remove<void>(
    routes.occurrence.delete(idOccurrence),
    undefined,
    { idOccurrence }
  );
};

const resolveOccurrence = async (
  idOccurrence: string | number,
  data: UpdateOccurrenceStatusRequest
) => {
  return await apiInstance.put<void>(
    routes.occurrence.resolve(idOccurrence),
    data,
    { idOccurrence }
  );
};

export const occurrenceService = {
  createOccurrence,
  getAllOccurrences,
  getOccurrenceByIdMonitor,
  setOccurrenceInAnalysis,
  deleteOccurrence,
  resolveOccurrence,
};

