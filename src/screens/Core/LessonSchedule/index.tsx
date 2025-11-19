import React from "react";

import { InfoCard, ScreenContainer } from "@components/index";

import * as S from "./styles";
import { useLessonSchedule } from "./useLessonSchedule";

const dayLabels = [
  { key: "monday", label: "Segunda" },
  { key: "tuesday", label: "Terça" },
  { key: "wednesday", label: "Quarta" },
  { key: "thursday", label: "Quinta" },
  { key: "friday", label: "Sexta" },
];

export default function LessonSchedule() {
  const { lessonSchedule, activePeriodId, activePeriod, handleSelectPeriod } =
    useLessonSchedule();

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Horários do Semestre"
    >
      <InfoCard
        icon="event"
        description="Selecione o período para visualizar os horários de aula."
      />

      <S.Container>
        <S.TabsScroll horizontal showsHorizontalScrollIndicator={false}>
          {lessonSchedule.map((period) => (
            <S.TabButton
              key={period.id}
              active={period.id === activePeriodId}
              onPress={() => handleSelectPeriod(period.id)}
            >
              <S.TabButtonText active={period.id === activePeriodId}>
                {period.title}
              </S.TabButtonText>
            </S.TabButton>
          ))}
        </S.TabsScroll>

        {activePeriod ? (
          <S.SlotsContainer>
            {activePeriod.slots.map((slot) => (
              <S.SlotCard key={`${activePeriod.id}-${slot.time}`}>
                <S.SlotHeader>
                  <S.SlotTime>{slot.time}</S.SlotTime>
                </S.SlotHeader>
                {dayLabels.map(({ key, label }) => {
                  const value = slot.days[key as keyof typeof slot.days];
                  if (!value) return null;

                  const [discipline, location] = value.split(" • ");
                  return (
                    <S.SlotRow key={`${slot.time}-${key}`}>
                      <S.SlotDay>{label}</S.SlotDay>
                      <S.SlotInfo>
                        <S.DisciplineTitle>{discipline}</S.DisciplineTitle>
                        {location && (
                          <S.DisciplineLocation>
                            {location}
                          </S.DisciplineLocation>
                        )}
                      </S.SlotInfo>
                    </S.SlotRow>
                  );
                })}
              </S.SlotCard>
            ))}
          </S.SlotsContainer>
        ) : null}
      </S.Container>
    </ScreenContainer>
  );
}
