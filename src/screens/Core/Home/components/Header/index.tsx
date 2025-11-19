import React from "react";
import { TouchableOpacity } from "react-native";

import { Label } from "@components/index";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import { DrawerParamList } from "@routes/types";

import { useAuth } from "@context/AuthContext";

import * as S from "./styles";

type NavigationProp = DrawerNavigationProp<DrawerParamList, "Menu">;

export const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();

  const fullName = user?.username ?? "";
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

        <TouchableOpacity>
          <S.NotificationIcon name="notifications" />
        </TouchableOpacity>
      </S.ContentRow>
    </S.Container>
  );
};

