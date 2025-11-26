import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Directory, File, Paths } from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system/legacy";
import { useCallback, useEffect, useMemo, useState } from "react";

import { firebase } from "@config/config";
import { useAuth } from "@context/AuthContext";
import { useLoading } from "@context/LoadingContext";
import { useModal } from "@context/ModalContext";
import { monitorService } from "@services/monitorService";
import { Monitor } from "@services/monitorService/types";

export const useMonitorList = () => {
  const { user } = useAuth();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const { showModal, hideModal } = useModal();

  const exampleSpreadsheet = useMemo(
    () => ({
      storagePath: "Planilha Exemplo de Importacao.xlsx",
      fallbackUrl:
        "https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/Planilha%20Exemplo%20de%20Importacao.xlsx?alt=media&token=f7847a38-709b-4278-ad4a-806a4c46ec70",
      filename: "Planilha_Exemplo_de_Importacao.xlsx",
    }),
    []
  );

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
            description: response.value.errorMessage,
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
        const pickedFile = new File(fileUri);
        return await pickedFile.base64();
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
    const fileBase64 = await pickDocument();
    if (!fileBase64) return;

    showLoading();
    try {
      const response = await monitorService.importMonitor({ fileBase64 });
      if (response.isSuccess) {
        showModal({
          description: "Monitores importados com sucesso",
          type: "success",
        });
        await getMonitors();
      } else if (response.isError) {
        showModal({
          description: response.value.errorMessage,
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

  const resolveDocumentDirectory = useCallback(() => {
    if (Paths?.document) {
      return Paths.document;
    }

    const legacyDir = (
      FileSystem as unknown as { documentDirectory?: string | null }
    ).documentDirectory;

    if (legacyDir) {
      return new Directory(legacyDir);
    }

    return null;
  }, []);

  const getDownloadUrl = useCallback(async () => {
    try {
      const ref = firebase.storage().ref(exampleSpreadsheet.storagePath);
      return await ref.getDownloadURL();
    } catch (error) {
      console.warn("Erro ao obter URL dinâmica, usando fallback.", error);
      return exampleSpreadsheet.fallbackUrl;
    }
  }, [exampleSpreadsheet.fallbackUrl, exampleSpreadsheet.storagePath]);

  const downloadExample = useCallback(async () => {
    try {
      showLoading();

      const downloadUrl = await getDownloadUrl();
      if (!downloadUrl) {
        throw new Error("URL do arquivo não disponível.");
      }

      const documentDirectory = resolveDocumentDirectory();
      if (!documentDirectory) {
        throw new Error("Diretório de documentos indisponível.");
      }

      const tempFile = new File(documentDirectory, "temp_planilha.xlsx");
      await File.downloadFileAsync(downloadUrl, tempFile, { idempotent: true });

      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (!permissions.granted || !permissions.directoryUri) {
        tempFile.delete();
        throw new Error("Nenhuma pasta selecionada.");
      }

      const mimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      const customFileUri = await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        exampleSpreadsheet.filename.replace(/\.[^/.]+$/, ""),
        mimeType
      );

      const fileBytes = await tempFile.bytes();
      const destinationFile = new File(customFileUri);
      destinationFile.write(fileBytes);

      tempFile.delete();

      showModal({
        title: "Download concluído",
        description: "Planilha salva na pasta escolhida.",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao baixar planilha:", error);
      showModal({
        description: "Não foi possível baixar a planilha de exemplo.",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  }, [
    getDownloadUrl,
    resolveDocumentDirectory,
    exampleSpreadsheet.filename,
    showLoading,
    hideLoading,
    showModal,
  ]);

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
              description: response.value.errorMessage,
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
            description: response.value.errorMessage,
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
    downloadExample,
    deleteMonitor,
    deleteAllMonitors,
  };
};
