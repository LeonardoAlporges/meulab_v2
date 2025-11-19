import { MaterialIcons } from "@expo/vector-icons";

export type MenuIconName = keyof typeof MaterialIcons.glyphMap;

export interface SubMenuItem {
  title: string;
  screen: string;
}

export interface MenuItem {
  key: string;
  title: string;
  condition: boolean | undefined;
  icon: MenuIconName;
  items: SubMenuItem[];
}