import { FontAwesome5 } from "@expo/vector-icons";
import * as React from "react";
import Modal from "react-native-modal";

import { Button } from "@components/index";

import * as S from "./styles";
import { ModalRootProps } from "./types";

const typeConfig = {
  error: { icon: "exclamation-circle", color: "#E83F5B" },
  success: { icon: "check-circle", color: "#12A454" },
  alert: { icon: "info-circle", color: "#F2C94C" },
} as const;

export default function ModalRoot({
  visible,
  title,
  description,
  type,
  buttons,
  onClose,
}: Readonly<ModalRootProps>): React.JSX.Element | null {
  if (!visible) return null;

  const resolvedType = type ?? "alert";
  const resolvedButtons = buttons?.length
    ? buttons
    : [{ title: "Fechar", onPress: onClose }];

  const { icon, color } = typeConfig[resolvedType];

  return (
    <S.Overlay>
      <Modal
        isVisible={visible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        backdropOpacity={0.5}
        useNativeDriver
      >
        <S.Container>
          <S.IconWrapper bgColor={color}>
            <FontAwesome5 name={icon} size={52} color={color} />
          </S.IconWrapper>
          <S.Title>{title}</S.Title>
          {description ? <S.Description>{description}</S.Description> : null}
          <S.ButtonsWrapper>
            {resolvedButtons.map((buttonProps, index) => (
              <Button key={`${buttonProps.title}-${index}`} {...buttonProps} />
            ))}
          </S.ButtonsWrapper>
        </S.Container>
      </Modal>
    </S.Overlay>
  );
}
