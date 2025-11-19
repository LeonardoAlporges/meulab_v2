import React from "react";

import {
  Button,
  InfoCard,
  Input,
  ScreenContainer,
  Select,
} from "@components/index";
import { laboratories, requestTypes } from "@utils/supportConstants";

import * as S from "./styles";
import { useSupportForm } from "./useSupportForm";

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

export default function SupportForm() {
  const { control, handleSubmit, errors, handleRegister } = useSupportForm();

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Solicitar Suporte"
    >
      <InfoCard
        icon="info"
        description="Preencha os dados abaixo de acordo com sua solicitação."
      />

      <S.FormContainer>
        <Select
          control={control}
          name="requestType"
          label="Tipo de Solicitação"
          placeholder="Selecione"
          options={requestTypes}
          error={errors.requestType?.message}
          large={true}
          marginTop={0}
        />

        <Select
          control={control}
          name="room"
          label="Laboratório"
          placeholder="Selecione"
          options={laboratories}
          error={errors.room?.message}
          large={true}
          marginTop={0}
        />

        <Input
          control={control}
          label="Identificação do equipamento"
          name="equipmentIdentification"
          placeholder="Identificação"
          error={errors.equipmentIdentification?.message}
          large={true}
          marginTop={12}
        />

        <Input
          control={control}
          label="Descrição da solicitação"
          name="description"
          placeholder="Descrição"
          error={errors.description?.message}
          large={true}
          multiline={true}
          marginTop={12}
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
