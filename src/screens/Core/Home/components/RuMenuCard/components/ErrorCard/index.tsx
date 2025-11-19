import React from "react";

import { Label } from "@components/index";

import * as S from "./styles";

export const ErrorCard: React.FC = () => {
  return (
    <S.ErrorCard>
      <Label
        text="Não foi possível obter dados do cardápio do dia."
        style={S.labelStyles.errorText}
      />
    </S.ErrorCard>
  );
};

