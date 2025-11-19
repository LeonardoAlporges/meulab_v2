import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";
import { UserNotification } from "@services/notificationService/types";

import * as S from "./styles";

interface NotificationCardProps {
  notification: UserNotification;
  onPress: (notification: UserNotification) => void;
  onDelete: (notification: UserNotification) => void;
}

const formatDateTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
  onDelete,
}) => {
  const formattedDate = useMemo(
    () => formatDateTime(notification.dateRequest || notification.createAt),
    [notification]
  );

  return (
    <S.CardContainer
      onPress={() => onPress(notification)}
      activeOpacity={0.9}
      isRead={notification.isRead}
    >
      <S.CardHeader>
        <S.Title>{notification.title}</S.Title>

        <TouchableOpacity onPress={() => onDelete(notification)}>
          <MaterialIcons
            name="delete-outline"
            size={22}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
      </S.CardHeader>

      <S.Description>{notification.description}</S.Description>

      <S.Footer>
        {!notification.isRead && (
          <S.UnreadBadge>
            <S.UnreadBadgeText>Novo</S.UnreadBadgeText>
          </S.UnreadBadge>
        )}
        {formattedDate !== "" && <S.DateText>{formattedDate}</S.DateText>}
      </S.Footer>
    </S.CardContainer>
  );
};

