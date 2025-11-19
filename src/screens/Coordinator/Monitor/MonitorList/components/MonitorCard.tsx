import React from "react";

import { Monitor } from "@services/monitorService/types";

import * as S from "../styles";

interface MonitorCardProps {
  monitor: Monitor;
  onEditSchedule: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MonitorCard: React.FC<MonitorCardProps> = ({
  monitor,
  onEditSchedule,
  onDelete,
}) => {
  const monitorName =
    monitor.username || monitor.name || `Monitor #${monitor.id}`;

  return (
    <S.MonitorCard>
      <S.MonitorInfo>
        <S.MonitorName>{monitorName}</S.MonitorName>
      </S.MonitorInfo>
      <S.ActionButton onPress={() => onEditSchedule(monitor.id)}>
        <S.ActionIcon name="schedule" />
      </S.ActionButton>
      <S.ActionButton onPress={() => onDelete(monitor.id)}>
        <S.DeleteIcon name="delete" />
      </S.ActionButton>
    </S.MonitorCard>
  );
};
