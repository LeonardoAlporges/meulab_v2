import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { useAuth } from "@context/AuthContext";
import { useModal } from "@context/ModalContext";
import { notificationService } from "@services/notificationService";
import { UserNotification } from "@services/notificationService/types";

export const useNotifications = () => {
  const { user } = useAuth();
  const { showModal, hideModal } = useModal();

  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const response = await notificationService.getNotificationsByUser(
        user.id
      );
      const data = response.isSuccess && Array.isArray(response.value)
        ? response.value
        : [];
      setNotifications(data);
      setEmpty(data.length === 0);
    } catch (error) {
      console.error(error);
      showModal({
        type: "error",
        description: "Erro ao carregar notificações",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, showModal]);

  const refreshUnreadCount = useCallback(async () => {
    if (!user?.id) return;
    await notificationService.getUnreadNotificationsCount(user.id);
  }, [user]);

  const markAsRead = useCallback(
    async (notification: UserNotification) => {
      const userNotificationId =
        notification.idUserNotification ?? notification.id;
      if (!userNotificationId || notification.isRead) {
        return;
      }
      try {
        const response = await notificationService.markNotificationAsRead(
          userNotificationId
        );
        if (response.isSuccess) {
          setNotifications((prev) =>
            prev.map((item) =>
              item.id === notification.id
                ? { ...item, isRead: true }
                : item
            )
          );
        } else if (response.isError) {
          showModal({
            type: "error",
            description:
              response.value?.errorMessage ||
              "Erro ao marcar notificação como lida",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          type: "error",
          description: "Erro ao marcar notificação como lida",
        });
      }
    },
    [showModal]
  );

  const deleteNotification = useCallback(
    (notification: UserNotification) => {
      const notificationId = notification.notificationId ?? notification.id;
      if (!notificationId) return;

      showModal({
        title: "Remover notificação",
        description: "Deseja realmente remover esta notificação?",
        type: "alert",
        buttons: [
          {
            title: "Cancelar",
            type: "TERTIARY",
            onPress: hideModal,
          },
          {
            title: "Remover",
            type: "PRIMARY",
            onPress: async () => {
              hideModal();
              try {
                const response =
                  await notificationService.deleteNotification(
                    notificationId
                  );
                if (response.isSuccess) {
                  setNotifications((prev) => {
                    const updated = prev.filter(
                      (item) => item.id !== notification.id
                    );
                    setEmpty(updated.length === 0);
                    return updated;
                  });
                } else if (response.isError) {
                  showModal({
                    type: "error",
                    description:
                      response.value?.errorMessage ||
                      "Erro ao remover notificação",
                  });
                }
              } catch (error) {
                console.error(error);
                showModal({
                  type: "error",
                  description: "Erro ao remover notificação",
                });
              }
            },
          },
        ],
      });
    },
    [hideModal, showModal]
  );

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [fetchNotifications])
  );

  return {
    notifications,
    isLoading,
    empty,
    markAsRead,
    deleteNotification,
    refreshUnreadCount,
    reload: fetchNotifications,
  };
};

