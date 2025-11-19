import React from "react";

import * as S from "../styles";

export const SupportLegends: React.FC = () => {
  return (
    <S.LegendsContainer>
      <S.LegendsTitle>Legenda de Status:</S.LegendsTitle>

      <S.LegendItem>
        <S.LegendBadge backgroundColor="#FFF3E0" borderColor="#FF9800">
          <S.LegendDot color="#FF9800" />
        </S.LegendBadge>
        <S.LegendText>Ativo - Solicitação criada e aguardando análise</S.LegendText>
      </S.LegendItem>

      <S.LegendItem>
        <S.LegendBadge backgroundColor="#E3F2FD" borderColor="#2196F3">
          <S.LegendDot color="#2196F3" />
        </S.LegendBadge>
        <S.LegendText>Em Análise - Coordenador está analisando</S.LegendText>
      </S.LegendItem>

      <S.LegendItem>
        <S.LegendBadge backgroundColor="#E8F5E9" borderColor="#4CAF50">
          <S.LegendDot color="#4CAF50" />
        </S.LegendBadge>
        <S.LegendText>Resolvido - Solicitação foi resolvida</S.LegendText>
      </S.LegendItem>

      <S.LegendItem>
        <S.LegendBadge backgroundColor="#F5F5F5" borderColor="#9E9E9E">
          <S.LegendDot color="#9E9E9E" />
        </S.LegendBadge>
        <S.LegendText>Deletado - Solicitação foi removida</S.LegendText>
      </S.LegendItem>
    </S.LegendsContainer>
  );
};

