import { ButtonProps } from "@components/Button/Button";

export type GlobalModalType = "error" | "success" | "alert";

export interface ModalRootProps {
  visible: boolean;
  title: string;
  description?: string;
  type: GlobalModalType;
  buttons?: ButtonProps[];
  onClose: () => void;
}
