import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

import { Label } from "@components/index";

import * as S from "./styles";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface InfoCardProps {
  icon?: MaterialIconName;
  title?: string;
  description: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon = "info",
  title,
  description,
}) => {
  return (
    <S.Container>
      <S.IconContainer>
        <S.Icon name={icon as any} />
      </S.IconContainer>
      <S.Content>
        {title && (
          <Label text={title} typography="md2" style={S.labelStyles.title} />
        )}
        <Label
          text={description}
          typography="sm"
          style={S.labelStyles.description}
        />
      </S.Content>
    </S.Container>
  );
};

