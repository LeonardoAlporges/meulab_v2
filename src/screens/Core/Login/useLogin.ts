import { useAuth } from "@context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export interface Credenciais {
  userLogin: string;
  password: string;
}

export const useLogin = () => {
  const [vigilante, setVigilante] = useState<boolean>(false);

  const { login, loading, loginAsWatchman, verifyLogin } = useAuth();

  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        userLogin: Yup.string().required("Campo obrigatório"),
        password: Yup.string().required("Campo obrigatório"),
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Credenciais>({
    resolver: yupResolver(formSchema),
  });

  const handleRegister = useCallback(
    async (credenciais: Credenciais) => {
      console.log(credenciais);
      if (vigilante) {
        await loginAsWatchman(credenciais);
      } else {
        await login(credenciais);
      }
    },
    [vigilante, loginAsWatchman, login]
  );

  const entryWithVigilante = useCallback(() => {
    setVigilante(true);
  }, []);

  const exitVigilante = useCallback(() => {
    setVigilante(false);
  }, []);

  useEffect(() => {
    verifyLogin();
  }, [verifyLogin]);

  return {
    vigilante,
    setVigilante,
    control,
    handleSubmit,
    errors,
    handleRegister,
    entryWithVigilante,
    exitVigilante,
    loading,
  };
};
