import { Label } from "@components/Label/Label";
import React from "react";

import { SubMenuItem } from "../../types";
import { ArrowIcon, Button, labelStyles } from "./styles";

interface SubMenuItemButtonProps {
  item: SubMenuItem;
  onNavigate: (screen: string) => void;
}

const SubMenuItemButton: React.FC<SubMenuItemButtonProps> = ({
  item,
  onNavigate,
}) => (
  <Button onPress={() => onNavigate(item.screen)}>
    <Label text={item.title} typography="sm" style={labelStyles.title} />
    <ArrowIcon name="keyboard-arrow-right" />
  </Button>
);

export default SubMenuItemButton;

