import React from "react";

import { InfoCard, ScreenContainer } from "@components/index";

import * as S from "./styles";

export default function Contact() {
  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Contatos"
    >
      <InfoCard
        icon="info"
        description="Entre em contato com a coordenação dos laboratórios para mais informações."
      />

      <S.ContentContainer>
        <S.TextOne>
          Para entrar em contato com a Coordenação dos Laboratórios, envie um
          email para:
        </S.TextOne>

        <S.EmailContainer>
          <S.EmailIcon name="email" />
          <S.EmailText>infolab.ufes@gmail.com</S.EmailText>
        </S.EmailContainer>

        <S.SectionDivider />

        <S.TextThree>Coordenador:</S.TextThree>

        <S.CoordinatorContainer>
          <S.CoordinatorIcon name="person" />
          <S.TextOne>
            Prof. MSc. Giuliano Prado de Morais Giglio
          </S.TextOne>
        </S.CoordinatorContainer>

        <S.DepartmentText>Departamento de Computação - CCENS</S.DepartmentText>
      </S.ContentContainer>
    </ScreenContainer>
  );
}

