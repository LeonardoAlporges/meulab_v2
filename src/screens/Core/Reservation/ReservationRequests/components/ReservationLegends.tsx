import React from "react";

import * as S from "../styles";

const legends = [
  { label: "Reserva em análise", color: "#1E88E5" },
  { label: "Reserva aprovada", color: "#2E7D32" },
  { label: "Reserva reprovada", color: "#C62828" },
  { label: "Cartão entregue", color: "#6A1B9A" },
  { label: "Cartão devolvido", color: "#00897B" },
];

export const ReservationLegends: React.FC = () => {
  return (
    <S.LegendsContainer>
      <S.LegendsTitle>Legenda de status</S.LegendsTitle>
      {legends.map((legend) => (
        <S.LegendItem key={legend.label}>
          <S.LegendDot color={legend.color} />
          <S.LegendText>{legend.label}</S.LegendText>
        </S.LegendItem>
      ))}
    </S.LegendsContainer>
  );
};

