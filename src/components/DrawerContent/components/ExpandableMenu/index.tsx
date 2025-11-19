import React from "react";

import { MenuItem } from "../../types";
import MenuItemButton from "../MenuItemButton";
import SubMenuItemButton from "../SubMenuItemButton";

interface ExpandableMenuProps {
  menu: MenuItem;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (screen: string) => void;
}

const ExpandableMenu: React.FC<ExpandableMenuProps> = ({
  menu,
  isOpen,
  onToggle,
  onNavigate,
}) => (
  <>
    <MenuItemButton
      title={menu.title}
      icon={menu.icon}
      isOpen={isOpen}
      onPress={onToggle}
    />
    {isOpen &&
      menu.items?.map((item) => (
        <SubMenuItemButton
          key={`${menu.key}-${item.screen}`}
          item={item}
          onNavigate={onNavigate}
        />
      ))}
  </>
);

export default ExpandableMenu;

