import { Label } from "@components/Label/Label";
import React from "react";

import { MenuIconName } from "../../types";
import { ArrowIcon, Button, MenuIcon, labelStyles } from "./styles";

interface MenuItemButtonProps {
  title: string;
  icon: MenuIconName;
  isOpen: boolean;
  onPress: () => void;
}

const MenuItemButton: React.FC<MenuItemButtonProps> = ({
  title,
  icon,
  isOpen,
  onPress,
}) => (
  <Button onPress={onPress}>
    <MenuIcon name={icon} />
    <Label text={title} typography="sm2" style={labelStyles.title} />
    <ArrowIcon name={isOpen ? "keyboard-arrow-down" : "keyboard-arrow-right"} />
  </Button>
);

export default MenuItemButton;

