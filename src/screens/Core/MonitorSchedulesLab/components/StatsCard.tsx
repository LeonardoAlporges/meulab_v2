import React from "react";

import * as S from "../styles";

interface DayStats {
  totalHours: number;
  hoursWithMonitor: number;
  hoursAvailable: number;
  uniqueMonitorsCount: number;
}

interface StatsCardProps {
  dayStats: DayStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ dayStats }) => {
  if (dayStats.totalHours === 0) return null;

  return (
    <S.StatsCard>
      <S.StatItem>
        <S.StatIcon name="schedule" />
        <S.StatValue>{dayStats.hoursWithMonitor}</S.StatValue>
        <S.StatLabel>Com Monitor</S.StatLabel>
      </S.StatItem>
      <S.StatItem>
        <S.StatIconSuccess name="check-circle" />
        <S.StatValueSuccess>{dayStats.hoursAvailable}</S.StatValueSuccess>
        <S.StatLabel>Disponíveis</S.StatLabel>
      </S.StatItem>
      <S.StatItem>
        <S.StatIcon name="people" />
        <S.StatValue>{dayStats.uniqueMonitorsCount}</S.StatValue>
        <S.StatLabel>Monitores</S.StatLabel>
      </S.StatItem>
    </S.StatsCard>
  );
};

