import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";

import { InfoCard, ScreenContainer } from "@components/index";
import { useNotifications } from "./useNotifications";
import * as S from "./styles";
import { NotificationCard } from "./components";

export default function Notifications() {
  const navigation = useNavigation();
  const {
    notifications,
    isLoading,
    empty,
    markAsRead,
    deleteNotification,
    refreshUnreadCount,
    reload,
  } = useNotifications();

  const handleGoBack = () => {
    refreshUnreadCount();
    navigation.goBack();
  };

  return (
    <ScreenContainer
      scrollable={false}
      goBack={true}
      previousScreenName="Home"
      title="Notificações"
      onPressBackCustom={handleGoBack}
    >
      <InfoCard
        icon="notifications"
        description="Clique em uma notificação para marcá-la como lida ou toque no ícone de lixeira para removê-la."
      />

      <S.ContentContainer>
        {isLoading && notifications.length === 0 ? (
          <S.EmptyContainer>
            <S.LoadingText>Carregando notificações...</S.LoadingText>
          </S.EmptyContainer>
        ) : null}

        {!isLoading && empty && (
          <S.EmptyContainer>
            <S.EmptyText>Você não possui notificações.</S.EmptyText>
          </S.EmptyContainer>
        )}

        {!empty && (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <NotificationCard
                notification={item}
                onPress={(notification) => {
                  void markAsRead(notification);
                }}
                onDelete={(notification) => {
                  deleteNotification(notification);
                }}
              />
            )}
            onRefresh={reload}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </S.ContentContainer>
    </ScreenContainer>
  );
}

