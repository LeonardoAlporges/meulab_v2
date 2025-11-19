import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";
import {
  CreateSupportRequest,
  Support,
  SupportFeedbackRequest,
  UpdateSupportStatusRequest,
} from "./types";

const createSupport = async (data: CreateSupportRequest) => {
  return await apiInstance.post<Support>(routes.support.create, data);
};

const getAllSupports = async () => {
  return await apiInstance.get<Support[]>(routes.support.getAll);
};

const getSupportById = async (idUser: string | number) => {
  return await apiInstance.get<Support[]>(routes.support.getById(idUser));
};

const setSupportInAnalysis = async (idSuporte: string | number) => {
  return await apiInstance.put<void>(
    routes.support.analysis(idSuporte),
    {},
    { idSupport: idSuporte }
  );
};

const deleteSupport = async (idSuporte: string | number) => {
  return await apiInstance.remove<void>(
    routes.support.delete(idSuporte),
    undefined,
    { idSupport: idSuporte }
  );
};

const resolveSupport = async (
  idSuporte: string | number,
  data: UpdateSupportStatusRequest
) => {
  return await apiInstance.put<void>(routes.support.resolve(idSuporte), data);
};

const sendFeedback = async (data: SupportFeedbackRequest) => {
  return await apiInstance.post<void>(routes.support.feedback, data);
};

export const supportService = {
  createSupport,
  getAllSupports,
  getSupportById,
  setSupportInAnalysis,
  deleteSupport,
  resolveSupport,
  sendFeedback,
};
