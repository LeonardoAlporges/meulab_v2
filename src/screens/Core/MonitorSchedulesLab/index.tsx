import React, { useMemo } from "react";

import { InfoCard, ScreenContainer } from "@components/index";

import { LongestIntervalCard, StatsCard } from "./components";
import * as S from "./styles";
import { useMonitorSchedulesLab } from "./useMonitorSchedulesLab";

const DAYS = [
  { id: 1, label: "Segunda" },
  { id: 2, label: "Terça" },
  { id: 3, label: "Quarta" },
  { id: 4, label: "Quinta" },
  { id: 5, label: "Sexta" },
];

export default function MonitorSchedulesLab() {
  const {
    selectedDay,
    setSelectedDay,
    groupedSchedules,
    sortedHours,
    dayStats,
    longestInterval,
    isLoading,
  } = useMonitorSchedulesLab();

  // Renderizar horários do dia selecionado (memoizado)
  const renderSchedules = useMemo(() => {
    if (sortedHours.length === 0) {
      return (
        <S.EmptyContainer>
          <S.EmptyText>
            Nenhum horário cadastrado para este dia da semana
          </S.EmptyText>
        </S.EmptyContainer>
      );
    }

    return sortedHours.map((hour) => {
      const hourItems = groupedSchedules[hour];
      const isAvailable = hourItems.some((item) => item.status === "available");
      const monitors = hourItems.filter(
        (item) => item.status !== "available" && item.username
      );
      const hasMonitor = monitors.length > 0;

      return (
        <S.ScheduleCard key={hour} hasMonitor={hasMonitor}>
          <S.HourContainer>
            <S.HourIcon name="schedule" />
            <S.HourText>{hour}</S.HourText>
            {isAvailable && !hasMonitor && (
              <S.AvailableBadge>
                <S.AvailableIcon name="check-circle" />
                <S.AvailableText>Disponível</S.AvailableText>
              </S.AvailableBadge>
            )}
          </S.HourContainer>
          {hasMonitor && (
            <S.MonitorContainer>
              <S.MonitorIcon name="person" />
              <S.MonitorName>
                {monitors.map((monitor, index) => (
                  <React.Fragment key={`${hour}-${monitor.id || index}`}>
                    {index > 0 && ", "}
                    {monitor.username}
                  </React.Fragment>
                ))}
              </S.MonitorName>
              {monitors.length > 1 && (
                <S.MultipleMonitorsBadge>
                  <S.MultipleMonitorsText>
                    {monitors.length}x
                  </S.MultipleMonitorsText>
                </S.MultipleMonitorsBadge>
              )}
            </S.MonitorContainer>
          )}
          {!hasMonitor && !isAvailable && (
            <S.MonitorContainer>
              <S.MonitorIconDisabled name="person-off" />
              <S.MonitorName style={{ fontStyle: "italic", color: "#999" }}>
                Sem monitor cadastrado
              </S.MonitorName>
            </S.MonitorContainer>
          )}
        </S.ScheduleCard>
      );
    });
  }, [sortedHours, groupedSchedules]);

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Horários dos Monitores"
    >
      <InfoCard
        icon="info"
        description="Consulte os horários disponíveis e quais monitores estarão no laboratório em cada período."
      />

      <S.DaysContainer>
        {DAYS.map((day) => (
          <S.DayButton
            key={day.id}
            active={selectedDay === day.id}
            onPress={() => setSelectedDay(day.id)}
          >
            <S.DayButtonText active={selectedDay === day.id}>
              {day.label}
            </S.DayButtonText>
          </S.DayButton>
        ))}
      </S.DaysContainer>

      {!isLoading && <StatsCard dayStats={dayStats} />}

      {!isLoading && <LongestIntervalCard longestInterval={longestInterval} />}

      {!isLoading && <S.ScheduleList>{renderSchedules}</S.ScheduleList>}
    </ScreenContainer>
  );
}
