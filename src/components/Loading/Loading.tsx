import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import styled from "@emotion/native";

interface LoadingProps {
  showLoading: boolean;
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const Loading: React.FC<LoadingProps> = ({ showLoading }) => {
  if (!showLoading) return null;

  return (
    <Modal visible={showLoading} transparent animationType="fade">
      <Overlay>
        <ActivityIndicator size="large" color="#143359" />
      </Overlay>
    </Modal>
  );
};

