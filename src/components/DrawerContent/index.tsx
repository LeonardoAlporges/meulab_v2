import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as React from "react";

import { Label } from "@components/index";

import * as DrawerComponents from "./components";
import * as S from "./styles";
import { useDrawerContent } from "./useDrawerContent";

export default function DrawerContent(): React.JSX.Element {
  const { openMenus, handleNavigate, toggleMenu, menuConfig, handleLogout } =
    useDrawerContent();

  return (
    <DrawerContentScrollView style={{ backgroundColor: "#143359" }}>
      <S.Container>
        {menuConfig.map(
          (menu) =>
            menu.condition && (
              <DrawerComponents.ExpandableMenu
                key={menu.key}
                menu={menu}
                isOpen={openMenus[menu.key] ?? false}
                onToggle={() => toggleMenu(menu.key)}
                onNavigate={handleNavigate}
              />
            )
        )}
        <DrawerComponents.SimpleMenuItem
          title="Sair"
          icon="logout"
          onPress={handleLogout}
        />
        <DrawerComponents.SimpleMenuItem
          title="Feedback e contato"
          icon="support-agent"
          screen="ContatoDesenvolvedor"
          onNavigate={handleNavigate}
        />
        <DrawerComponents.SimpleMenuItem
          title="Sair"
          icon="logout"
          onPress={handleLogout}
        />
      </S.Container>
      <S.SignatureContainer>
        <Label
          text="Desenvolvido por: Leonardo Alporges Martins"
          typography="sm"
          style={S.signatureStyles.text}
        />
        <Label
          text="alporges.leonardo@gmail.com"
          typography="sm"
          style={S.signatureStyles.email}
        />
      </S.SignatureContainer>
    </DrawerContentScrollView>
  );
}
