import React, { useMemo } from "react";

import { Button, Input, Loading } from "@Components";

import iconImage from "@assets/icon2.png";
import ufesImage from "@assets/ufes_pref_cor_fundosEscuros.png";
import {
  CardContainer,
  Container,
  ContainerInput,
  LogoImage,
  UfesImage,
} from "./styles";
import { useLogin } from "./useLogin";

function Login() {
  const {
    vigilante,
    control,
    handleSubmit,
    errors,
    handleRegister,
    entryWithVigilante,
    exitVigilante,
    loading,
  } = useLogin();

  const renderLoginForm = useMemo(
    () => (
      <>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          label="Login UFES"
          large={true}
          control={control}
          name="userLogin"
          placeholder="Matrícula"
          error={errors?.userLogin?.message || ""}
        />

        <Input
          autoCapitalize="none"
          label="Senha"
          large={true}
          control={control}
          name="password"
          placeholder="Senha"
          error={errors?.password?.message || ""}
          secureTextEntry
        />

        <Button
          onPress={handleSubmit(handleRegister)}
          title="Entrar"
          type="PRIMARY"
        />
        <Button
          type="TERTIARY"
          title="Acesso para controle de salas"
          onPress={entryWithVigilante}
        />
      </>
    ),
    [control, errors, handleSubmit, handleRegister, entryWithVigilante]
  );

  const renderVigilanteForm = useMemo(
    () => (
      <>
        <Input
          label="Chave de acesso"
          large={true}
          control={control}
          name="userLogin"
          placeholder="Chave"
          error={errors?.userLogin?.message || ""}
        />

        <Input
          label="Senha"
          large={true}
          control={control}
          name="password"
          placeholder="Senha"
          error={errors?.password?.message || ""}
          secureTextEntry
        />

        <Button
          marginTop={10}
          onPress={handleSubmit(handleRegister)}
          title="Entrar"
          type="PRIMARY"
        />
        <Button
          marginTop={10}
          type="TERTIARY"
          title="Cancelar"
          onPress={exitVigilante}
        />
      </>
    ),
    [control, errors, handleSubmit, handleRegister, exitVigilante]
  );

  const currentForm = useMemo(
    () => (vigilante ? renderVigilanteForm : renderLoginForm),
    [vigilante, renderVigilanteForm, renderLoginForm]
  );

  return (
    <Container>
      {loading && <Loading showLoading={loading} />}
      <CardContainer>
        <LogoImage source={iconImage} resizeMode="stretch" />
        <ContainerInput>{currentForm}</ContainerInput>
      </CardContainer>
      <UfesImage source={ufesImage} resizeMode="contain" />
    </Container>
  );
}

export default React.memo(Login);
