import React from "react";

import { Label } from "@components/index";
import { theme } from "@config/theme";

import { QuickAccessItem } from "../../quickAccessItems";
import * as S from "./styles";

interface AllServicesGridProps {
  items: QuickAccessItem[];
}

export const AllServicesGrid: React.FC<AllServicesGridProps> = ({ items }) => {
  return (
    <>
      <Label text="Demais Serviços" marginBottom={theme.spacing.sm} />
      <S.GridContainer>
        {items.map((item) => (
          <S.ServiceButton key={item.title} onPress={item.onPress}>
            <S.IconContainer>
              <S.ServiceIcon name={item.icon as any} />
            </S.IconContainer>
            <S.TextContainer>
              <Label
                text={item.title}
                style={S.serviceLabel}
                numberOfLines={2}
              />
            </S.TextContainer>
          </S.ServiceButton>
        ))}
      </S.GridContainer>
    </>
  );
};
