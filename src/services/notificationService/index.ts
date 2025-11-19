import apiInstance from "@services/apiInstance";
import { routes } from "@utils/routesApi";

import {
  CreateNotificationRequest,
  UnreadNotificationsResponse,
  UserNotification,
} from "./types";

const createNotification = async (data: CreateNotificationRequest) => {
  return await apiInstance.post<void>(routes.notification.create, data);
};

const getNotificationsByUser = async (idUser: number | string) => {
  return await apiInstance.get<UserNotification[]>(
    routes.notification.user(idUser)
  );
};

const getUnreadNotificationsCount = async (idUser: number | string) => {
  return await apiInstance.get<UnreadNotificationsResponse | number>(
    routes.notification.userNumber(idUser)
  );
};

const markNotificationAsRead = async (
  idNotification: number | string
) => {
  return await apiInstance.put<void>(
    routes.notification.markAsRead(idNotification)
  );
};

const deleteNotification = async (idNotification: number | string) => {
  return await apiInstance.put<void>(
    routes.notification.delete(idNotification)
  );
};

export const notificationService = {
  createNotification,
  getNotificationsByUser,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  deleteNotification,
};

