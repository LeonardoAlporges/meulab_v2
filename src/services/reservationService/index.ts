import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";

import {
  AnalyzeReservationRequest,
  CreateReservationRequest,
  Reservation,
} from "./types";

const createReservation = async (data: CreateReservationRequest) => {
  return await apiInstance.post<Reservation>(routes.reservation.create, data);
};

const getAllReservations = async () => {
  return await apiInstance.get<Reservation[]>(routes.reservation.getAll);
};

const getReservationsByUser = async (idUser: number | string) => {
  return await apiInstance.get<Reservation[]>(
    routes.reservation.getByUser(idUser)
  );
};

const analyzeReservation = async (data: AnalyzeReservationRequest) => {
  return await apiInstance.post<void>(routes.reservation.analysis, data);
};

const markReservationDelivered = async (idReservation: number | string) => {
  return await apiInstance.put<void>(
    routes.reservation.delivered(idReservation),
    {},
    { idReservation }
  );
};

const markReservationReturned = async (idReservation: number | string) => {
  return await apiInstance.put<void>(
    routes.reservation.returned(idReservation),
    {},
    { idReservation }
  );
};

export const reservationService = {
  createReservation,
  getAllReservations,
  getReservationsByUser,
  analyzeReservation,
  markReservationDelivered,
  markReservationReturned,
};

