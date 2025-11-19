import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { supportService } from "@services/supportService";
import { Support } from "@services/supportService/types";

export const useSupportRequests = () => {
  const { user } = useAuth();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { showModal } = useModal();

  const [supports, setSupports] = useState<Support[]>([]);
  const [empty, setEmpty] = useState(false);

  const getSupports = useCallback(async () => {
    if (!user?.id) return;

    showLoading();
    try {
      let response;
      if (user.isCoordinator) {
        // Coordenador vê todas as solicitações
        response = await supportService.getAllSupports();
      } else {
        // Usuário comum vê apenas as suas
        response = await supportService.getSupportById(user.id);
      }

      if (response.isSuccess && response.value) {
        const supportsList = Array.isArray(response.value)
          ? response.value
          : [];
        setSupports(supportsList);
        setEmpty(supportsList.length === 0);
      } else {
        setSupports([]);
        setEmpty(true);
        if (response.isError) {
          showModal({
            description:
              response.value?.errorMessage || "Erro ao carregar solicitações",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setSupports([]);
      setEmpty(true);
      showModal({
        description: "Erro ao carregar solicitações",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [user, showLoading, hideLoading, showModal]);

  useFocusEffect(
    useCallback(() => {
      getSupports();
    }, [getSupports])
  );

  return {
    supports,
    empty,
    isLoading,
    getSupports,
  };
};
