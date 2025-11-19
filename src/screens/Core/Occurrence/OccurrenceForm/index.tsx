import React from "react";

import {
  Button,
  InfoCard,
  Input,
  ScreenContainer,
} from "@components/index";

import * as S from "./styles";
import { useOccurrenceForm } from "./useOccurrenceForm";

const formatDate = (text: string): string => {
  // Remove tudo que não é número
  const numbers = text.replaceAll(/\D/g, "");

  // Aplica a máscara DD/MM/AAAA
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  } else {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  }
};

export default function OccurrenceForm() {
  const { control, handleSubmit, errors, handleRegister } = useOccurrenceForm();

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Registrar Ocorrência"
    >
      <InfoCard
        icon="info"
        description="Preencha os dados abaixo de acordo com a ocorrência."
      />

      <S.FormContainer>
        <Input
          control={control}
          label="Descrição da ocorrência"
          name="description"
          placeholder="Descrição"
          error={errors.description?.message}
          large={true}
          multiline={true}
          marginTop={0}
        />

        <Input
          control={control}
          label="Data Ocorrido"
          name="dateOccurrence"
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          error={errors.dateOccurrence?.message}
          large={true}
          marginTop={12}
          isMask={true}
          handleChangeText={formatDate}
          maxLength={10}
        />

        <Input
          control={control}
          label="Identificação do causador da ocorrência"
          name="occurrenceUser"
          placeholder="Infrator"
          error={errors.occurrenceUser?.message}
          large={true}
          marginTop={12}
        />

        <Input
          control={control}
          label="Providências tomadas"
          name="provisions"
          placeholder="Providências"
          error={errors.provisions?.message}
          large={true}
          multiline={true}
          marginTop={12}
        />

        <Button
          onPress={handleSubmit(handleRegister)}
          title="Enviar"
          type="PRIMARY"
          marginTop={24}
        />
      </S.FormContainer>
    </ScreenContainer>
  );
}

