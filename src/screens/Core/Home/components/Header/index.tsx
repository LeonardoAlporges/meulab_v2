import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

import { Label } from "@components/index";
import { MaterialIcons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { DrawerParamList, RootStackParamList } from "@routes/types";

import { useAuth } from "@context/AuthContext";
import { notificationService } from "@services/notificationService";

import * as S from "./styles";

type DrawerNav = DrawerNavigationProp<DrawerParamList, "Menu">;
type StackNav = NativeStackNavigationProp<RootStackParamList>;
type NavigationProp = CompositeNavigationProp<DrawerNav, StackNav>;

export const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const fullName = user?.username ?? "";
  const fetchUnreadCount = useCallback(async () => {
    if (!user?.id) {
      setUnreadCount(0);
      return;
    }

    try {
      const response = await notificationService.getUnreadNotificationsCount(
        user.id
      );
      if (response.isSuccess) {
        const value = response.value;
        if (
          typeof value === "object" &&
          value !== null &&
          "count" in value
        ) {
          setUnreadCount(
            typeof value.count === "number" ? value.count : Number(value.count)
          );
        } else {
          setUnreadCount(Number(value) || 0);
        }
      } else {
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Erro ao buscar notificações não lidas:", error);
      setUnreadCount(0);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchUnreadCount();
    }, [fetchUnreadCount])
  );
  const registrationNumber = user?.registrationNumber ?? "";
  const email = user?.institutionalEmail ?? "";

  return (
    <S.Container>
      <S.ContentRow>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <S.MenuIcon name="menu" />
        </TouchableOpacity>

        <S.UserInfo>
          <Label
            text={`Olá, ${fullName}`}
            typography="md2"
            style={S.labelStyles.greeting}
          />
          {registrationNumber && (
            <Label
              text={registrationNumber}
              typography="sm"
              style={S.labelStyles.info}
            />
          )}
          {email && (
            <Label text={email} typography="sm" style={S.labelStyles.info} />
          )}
        </S.UserInfo>

        <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
          <S.NotificationWrapper>
            <S.NotificationIcon name="notifications" />
            {unreadCount > 0 && (
              <S.NotificationBadge>
                <S.NotificationBadgeText>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </S.NotificationBadgeText>
              </S.NotificationBadge>
            )}
          </S.NotificationWrapper>
        </TouchableOpacity>
      </S.ContentRow>
    </S.Container>
  );
};

