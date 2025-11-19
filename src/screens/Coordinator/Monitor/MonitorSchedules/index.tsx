import React from "react";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { useMonitorSchedules } from "./useMonitorSchedules";

import * as S from "./styles";

const DAYS = [
  { id: 1, label: "Segunda" },
  { id: 2, label: "Terça" },
  { id: 3, label: "Quarta" },
  { id: 4, label: "Quinta" },
  { id: 5, label: "Sexta" },
];

const HOUR_IDS = Array.from({ length: 15 }, (_, i) => i + 1);

export default function MonitorSchedules() {
  const {
    selectedDay,
    setSelectedDay,
    getHoursForDay,
    formatHour,
    isLoading,
    toggleHour,
    saveSchedule,
    hasChanges,
  } = useMonitorSchedules();

  const selectedHours = getHoursForDay(selectedDay);

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Horários dos Monitores"
    >
      <InfoCard
        icon="info"
        description="Selecione um dia da semana e clique nos horários para marcar/desmarcar"
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

      {!isLoading && (
        <>
          <S.HoursGrid>
            {HOUR_IDS.map((hourId) => {
              const isSelected = selectedHours.includes(hourId);
              return (
                <S.HourCard
                  key={hourId}
                  selected={isSelected}
                  onPress={() => toggleHour(selectedDay, hourId)}
                >
                  <S.HourText selected={isSelected}>
                    {formatHour(hourId)}
                  </S.HourText>
                </S.HourCard>
              );
            })}
          </S.HoursGrid>
          {hasChanges && (
            <Button
              onPress={saveSchedule}
              title="Salvar Alterações"
              type="PRIMARY"
              marginTop={16}
            />
          )}
        </>
      )}
    </ScreenContainer>
  );
}
