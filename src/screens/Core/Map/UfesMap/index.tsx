import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Linking } from "react-native";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { theme } from "@config/theme";

import * as S from "./styles";
import { useUfesMap } from "./useUfesMap";

export default function UfesMap() {
  const { categories, selectedPoint, handleSelectPoint } = useUfesMap();

  return (
    <ScreenContainer
      scrollable={true}
      goBack={true}
      previousScreenName="Home"
      title="Mapa UFES - Chi-Chiu"
    >
      <InfoCard
        icon="map"
        description="Visualize o mapa do campus com destaque para o laboratório Chi-Chiu."
      />

      <S.PointsWrapper
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.md,
        }}
      >
        {categories.map((category) => (
          <S.CategorySection key={category.name}>
            <S.CategoryHeader>
              <MaterialIcons
                name={category.icon}
                size={18}
                color={theme.colors.primary}
              />
              <S.CategoryTitle>{category.name}</S.CategoryTitle>
            </S.CategoryHeader>

            {category.points.map((point) => {
              const isActive = selectedPoint?.name === point.name;
              return (
                <S.PointButton
                  key={point.name}
                  onPress={() => handleSelectPoint(point)}
                  isActive={isActive}
                  activeOpacity={0.85}
                >
                  <S.PointIconContainer isActive={isActive}>
                    <MaterialIcons
                      name="place"
                      size={18}
                      color={
                        isActive
                          ? theme.colors.background
                          : theme.colors.primary
                      }
                    />
                  </S.PointIconContainer>
                  <S.PointText isActive={isActive}>{point.name}</S.PointText>
                </S.PointButton>
              );
            })}
          </S.CategorySection>
        ))}
      </S.PointsWrapper>

      {selectedPoint && (
        <S.ButtonsRow>
          <Button
            title="Abrir no Google Maps"
            type="PRIMARY"
            style={{ flex: 1, marginTop: 16, marginRight: theme.spacing.sm }}
            onPress={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${selectedPoint.coordinates[1]},${selectedPoint.coordinates[0]}`;
              Linking.openURL(url);
            }}
          />
          <Button
            title="Traçar rota"
            type="SECONDARY"
            style={{ flex: 1, marginTop: 16 }}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.coordinates[1]},${selectedPoint.coordinates[0]}`
              )
            }
          />
        </S.ButtonsRow>
      )}
    </ScreenContainer>
  );
}
