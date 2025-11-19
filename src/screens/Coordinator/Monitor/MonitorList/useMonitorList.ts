import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { monitorService } from "@services/monitorService";
import { Monitor } from "@services/monitorService/types";

export const useMonitorList = () => {
  const { user } = useAuth();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { showModal, hideModal } = useModal();

  const [monitores, setMonitores] = useState<Monitor[]>([]);
  const [empty, setEmpty] = useState(false);

  const getMonitors = useCallback(async () => {
    showLoading();
    try {
      const response = await monitorService.listMonitores();
      if (response.isSuccess && response.value) {
        setMonitores(Array.isArray(response.value) ? response.value : []);
        setEmpty(!Array.isArray(response.value) || response.value.length === 0);
      } else {
        setMonitores([]);
        setEmpty(true);
        if (response.isError) {
          showModal({
            description:
              response.value.errorMessage || "Erro ao carregar monitores",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMonitores([]);
      setEmpty(true);
    } finally {
      hideLoading();
    }
  }, [showModal, showLoading, hideLoading]);

  const pickDocument = async (): Promise<string | null> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: "base64",
        });
        return base64;
      }
      return null;
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
      showModal({
        description: "Erro ao selecionar arquivo",
        type: "error",
      });
      return null;
    }
  };

  const importMonitors = useCallback(async () => {
    const base64 = await pickDocument();
    if (!base64) return;

    showLoading();
    try {
      const response = await monitorService.importMonitor({ base64 });
      if (response.isSuccess) {
        showModal({
          description: "Monitores importados com sucesso",
          type: "success",
        });
        await getMonitors();
      } else if (response.isError) {
        showModal({
          description:
            response.value.errorMessage || "Erro ao importar monitores",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao importar monitores",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading, showModal, getMonitors]);

  const importMonitorSchedules = useCallback(async () => {
    const base64 = await pickDocument();
    if (!base64) return;

    showLoading();
    try {
      const response = await monitorService.importSchedule({ base64 });
      if (response.isSuccess) {
        showModal({
          description: "Horários importados com sucesso",
          type: "success",
        });
      } else if (response.isError) {
        showModal({
          description:
            response.value.errorMessage || "Erro ao importar horários",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        description: "Erro ao importar horários",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading, showModal]);

  const downloadExample = useCallback(async () => {
    showModal({
      description: "Funcionalidade de download de exemplo em desenvolvimento",
      type: "error",
    });
  }, [showModal]);

  const downloadExampleSchedules = useCallback(async () => {
    showModal({
      description:
        "Funcionalidade de download de exemplo de horários em desenvolvimento",
      type: "error",
    });
  }, [showModal]);

  const deleteMonitor = useCallback(
    (idMonitor: number) => {
      const executeDeletion = async () => {
        hideModal();
        showLoading();
        try {
          const response = await monitorService.deleteMonitor(idMonitor);
          if (response.isSuccess) {
            showModal({
              description: "Monitor removido com sucesso",
              type: "success",
            });
            await getMonitors();
          } else if (response.isError) {
            showModal({
              description:
                response.value.errorMessage || "Erro ao remover monitor",
              type: "error",
            });
          }
        } catch (error) {
          console.error(error);
          showModal({
            description: "Erro ao remover monitor",
            type: "error",
          });
        } finally {
          hideLoading();
        }
      };

      showModal({
        title: "Confirmar exclusão",
        description:
          "Tem certeza que deseja remover este monitor? Esta ação não pode ser desfeita.",
        type: "alert",
        buttons: [
          {
            title: "Não",
            type: "PRIMARY",
            onPress: hideModal,
          },
          {
            title: "Sim",
            type: "TERTIARY",
            onPress: () => {
              executeDeletion();
            },
          },
        ],
      });
    },
    [showLoading, hideLoading, showModal, hideModal, getMonitors]
  );

  const deleteAllMonitors = useCallback(async () => {
    if (!user?.id) return;

    const executeDeletion = async () => {
      hideModal();
      showLoading();
      try {
        const response = await monitorService.deleteAllMonitores(user.id);
        if (response.isSuccess) {
          showModal({
            description: "Todos os monitores foram removidos",
            type: "success",
          });
          await getMonitors();
        } else if (response.isError) {
          showModal({
            description:
              response.value.errorMessage || "Erro ao remover monitores",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        showModal({
          description: "Erro ao remover monitores",
          type: "error",
        });
      } finally {
        hideLoading();
      }
    };

    showModal({
      title: "Confirmar exclusão",
      description:
        "Tem certeza que deseja remover TODOS os monitores? Esta ação não pode ser desfeita.",
      type: "alert",
      buttons: [
        {
          title: "Não",
          type: "PRIMARY",
          onPress: hideModal,
        },
        {
          title: "Sim",
          type: "TERTIARY",
          onPress: () => {
            executeDeletion();
          },
        },
      ],
    });
  }, [user?.id, showLoading, hideLoading, showModal, hideModal, getMonitors]);

  useEffect(() => {
    getMonitors();
  }, [getMonitors]);

  return {
    monitores,
    isLoading,
    empty,
    getMonitors,
    importMonitors,
    importMonitorSchedules,
    downloadExample,
    downloadExampleSchedules,
    deleteMonitor,
    deleteAllMonitors,
  };
};

