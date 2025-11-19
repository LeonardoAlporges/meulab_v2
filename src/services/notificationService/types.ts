export interface CreateNotificationRequest {
  title: string;
  description: string;
}

export interface UserNotification {
  idUserNotification?: number;
  id: number;
  notificationId?: number;
  userId: number;
  title: string;
  description: string;
  isRead: boolean;
  dateRequest?: string;
  dateSend?: string | null;
  deleteAt?: string | null;
  createAt?: string;
  updateAt?: string;
}

export interface UnreadNotificationsResponse {
  count: number;
}

