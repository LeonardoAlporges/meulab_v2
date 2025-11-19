import React from "react";
import { FlatList } from "react-native";

import { InfoCard, ScreenContainer } from "@components/index";

import * as S from "./styles";
import { informationSystemsCurriculum } from "./data";

export default function InformationSystemsCurriculum() {
  return (
    <ScreenContainer
      scrollable={false}
      goBack={true}
      previousScreenName="Home"
      title="Grade de Sistemas de Informação"
    >
      <InfoCard
        icon="book"
        description="Consulte as disciplinas oferecidas em cada período do curso de Sistemas de Informação."
      />

      <FlatList
        data={informationSystemsCurriculum}
        keyExtractor={(item) => item.periodo}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <S.PeriodCard>
            <S.PeriodHeader>
              <S.PeriodTitle>{item.periodo}</S.PeriodTitle>
              <S.DisciplineCount>
                {item.disciplinas.length} disciplinas
              </S.DisciplineCount>
            </S.PeriodHeader>
            {item.disciplinas.map((disciplina) => (
              <S.DisciplineItem key={disciplina}>
                <S.Bullet />
                <S.DisciplineText>{disciplina}</S.DisciplineText>
              </S.DisciplineItem>
            ))}
          </S.PeriodCard>
        )}
      />
    </ScreenContainer>
  );
}

