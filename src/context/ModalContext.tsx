import * as React from "react";
import { useCallback, useContext, useMemo, useState } from "react";

import { ButtonProps } from "@components/Button/Button";
import { Modal } from "@components/index";
import { GlobalModalType } from "@components/Modal/types";

interface ModalProviderProps {
  children: React.ReactNode;
}

export interface ShowModalOptions {
  title?: string;
  description?: string;
  type?: GlobalModalType;
  buttons?: ButtonProps[];
}

interface ModalState extends Omit<ShowModalOptions, "title" | "type"> {
  visible: boolean;
  title: string;
  type: GlobalModalType;
}

export interface ModalContextData {
  showModal: (options: ShowModalOptions) => void;
  hideModal: () => void;
}

const initialState: ModalState = {
  visible: false,
  title: "",
  description: undefined,
  type: "alert",
  buttons: undefined,
};

const ModalContext = React.createContext<ModalContextData | null>(null);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(initialState);

  const hideModal = useCallback(() => {
    setModalState(initialState);
  }, []);

  const showModal = useCallback(
    (options: ShowModalOptions) => {
      const type = options.type ?? "alert";
      const title =
        options.title ??
        (() => {
          switch (type) {
            case "error":
              return "Encontramos um problema";
            case "success":
              return "Sucesso!";
            default:
              return "";
          }
        })();

      setModalState({
        visible: true,
        title,
        description: options.description,
        type,
        buttons: options.buttons ?? [
          {
            title: "Ok",
            type: "PRIMARY",
            onPress: hideModal,
          },
        ],
      });
    },
    [hideModal]
  );

  const contextValue = useMemo<ModalContextData>(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal
        visible={modalState.visible}
        title={modalState.title}
        description={modalState.description}
        type={modalState.type}
        buttons={modalState.buttons}
        onClose={hideModal}
      />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextData => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export default ModalProvider;
