import React from "react";

import { Button, InfoCard, Input, ScreenContainer, Select } from "@components/index";
import { laboratories } from "@utils/supportConstants";
import { reservationSchedules, yesNoOptions } from "@utils/reservationConstants";

import * as S from "./styles";
import { useReservationForm } from "./useReservationForm";

const formatCpf = (text: string): string => {
  const digits = text.replaceAll(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
    6,
    9
  )}-${digits.slice(9, 11)}`;
};

const formatPhone = (text: string): string => {
  const digits = text.replaceAll(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatDate = (text: string): string => {
  const numbers = text.replaceAll(/\D/g, "").slice(0, 8);
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  }
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

export default function RoomReservationForm() {
  const { control, handleSubmit, errors, handleRegister } = useReservationForm();

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="RoomReservationTerms"
      title="Solicitar Reserva"
    >
      <InfoCard
        icon="assignment"
        description="Preencha os dados com atenção. A coordenação analisará a solicitação e retornará em até 2 dias úteis."
      />

      <S.FormContainer>
        <Input
          control={control}
          label="CPF (somente números)"
          name="cpf"
          placeholder="000.000.000-00"
          error={errors.cpf?.message}
          handleChangeText={formatCpf}
          keyboardType="numeric"
        />

        <Input
          control={control}
          label="Telefone"
          name="phone"
          placeholder="(00) 00000-0000"
          error={errors.phone?.message}
          handleChangeText={formatPhone}
          keyboardType="phone-pad"
          marginTop={12}
        />

        <Select
          control={control}
          name="room"
          label="Laboratório"
          placeholder="Selecione"
          options={laboratories}
          error={errors.room?.message}
          large={true}
          marginTop={12}
        />

        <Input
          control={control}
          label="Data da reserva"
          name="reservationDate"
          placeholder="DD/MM/AAAA"
          error={errors.reservationDate?.message}
          handleChangeText={formatDate}
          keyboardType="numeric"
          marginTop={12}
          maxLength={10}
        />

        <Select
          control={control}
          name="startTime"
          label="Horário de início"
          placeholder="Selecione"
          options={reservationSchedules}
          error={errors.startTime?.message}
          large={true}
          marginTop={12}
        />

        <Select
          control={control}
          name="endTime"
          label="Horário de término"
          placeholder="Selecione"
          options={reservationSchedules}
          error={errors.endTime?.message}
          large={true}
          marginTop={12}
        />

        <S.TermsDescription>
          Confirmo que devolvo o cartão magnético imediatamente após o uso e me
          responsabilizo por perdas ou danos.
        </S.TermsDescription>

        <Select
          control={control}
          name="consentForm"
          placeholder="Selecione"
          options={yesNoOptions}
          error={errors.consentForm?.message}
          large={true}
          marginTop={0}
        />

        <Button
          onPress={handleSubmit(handleRegister)}
          title="Enviar solicitação"
          type="PRIMARY"
          marginTop={24}
        />
      </S.FormContainer>
    </ScreenContainer>
  );
}

