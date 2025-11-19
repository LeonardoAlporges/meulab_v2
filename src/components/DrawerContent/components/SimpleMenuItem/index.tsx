import { Label } from "@components/Label/Label";
import React from "react";

import { MenuIconName } from "../../types";
import {
  ArrowIcon,
  Button,
  MenuIcon,
  labelStyles,
} from "../MenuItemButton/styles";

interface SimpleMenuItemProps {
  title: string;
  icon: MenuIconName;
  screen?: string;
  onNavigate?: (screen: string) => void;
  onPress?: () => void;
}

const SimpleMenuItem: React.FC<SimpleMenuItemProps> = ({
  title,
  icon,
  screen,
  onNavigate,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (screen && onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <Button onPress={handlePress}>
      <MenuIcon name={icon} />
      <Label text={title} typography="sm2" style={labelStyles.title} />
      <ArrowIcon name="keyboard-arrow-right" />
    </Button>
  );
};

export default SimpleMenuItem;

