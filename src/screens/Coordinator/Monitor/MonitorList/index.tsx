import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

import { Button, InfoCard, Label, ScreenContainer } from "@components/index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@routes/types";

import { MonitorCard } from "./components/MonitorCard";
import * as S from "./styles";
import { useMonitorList } from "./useMonitorList";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MonitorList"
>;

export default function MonitorList() {
  const navigation = useNavigation<NavigationProp>();
  const {
    monitores,
    empty,
    getMonitors,
    importMonitors,
    downloadExample,
    deleteMonitor,
    deleteAllMonitors,
    isLoading,
  } = useMonitorList();

  useFocusEffect(
    useCallback(() => {
      getMonitors();
    }, [getMonitors])
  );

  const handleEditSchedule = (id: number) => {
    navigation.navigate("MonitorSchedules", { monitorId: id });
  };

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Monitores"
    >
      <InfoCard
        icon="info"
        description="Nesta tela você pode gerenciar os monitores do laboratório. Baixe a planilha de exemplo única, importe monitores e horários de uma só vez e gerencie a lista de monitores cadastrados."
      />

      <Label text="Planilha de exemplo:" typography="sm" marginBottom={8} />

      <S.ButtonRow>
        <S.ButtonWrapper>
          <Button
            onPress={downloadExample}
            title="Monitores e horários"
            type="TERTIARY"
            marginTop={0}
          />
        </S.ButtonWrapper>
      </S.ButtonRow>

      <Button
        onPress={importMonitors}
        title="Importar monitores e horários"
        marginTop={0}
      />

      <S.MonitorsContainer>
        {!isLoading && empty && (
          <S.EmptyContainer>
            <Label
              text="Ainda não existem monitores cadastrados"
              typography="sm"
              style={{ color: "#999" }}
            />
          </S.EmptyContainer>
        )}
        {!isLoading && !empty && (
          <>
            {monitores.map((monitor) => (
              <MonitorCard
                key={monitor.id}
                monitor={monitor}
                onEditSchedule={handleEditSchedule}
                onDelete={deleteMonitor}
              />
            ))}
          </>
        )}
      </S.MonitorsContainer>

      {!isLoading && monitores.length > 0 && (
        <Button
          onPress={deleteAllMonitors}
          title="Remover TODOS monitores"
          type="SECONDARY"
          marginTop={16}
        />
      )}
    </ScreenContainer>
  );
}
