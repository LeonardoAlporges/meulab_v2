import React, { useState } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { WebView } from "react-native-webview";

import { Button, InfoCard, ScreenContainer } from "@components/index";
import { theme } from "@config/theme";

import * as S from "./styles";

const CASI_URL = "https://casiufesalegre.github.io/sitecasi/index.html";

export default function SiteCasi() {
  const [loading, setLoading] = useState(true);

  return (
    <ScreenContainer
      scrollable={false}
      goBack={true}
      previousScreenName="Home"
      title="Site do CASI"
    >
      <InfoCard
        icon="groups"
        description="Acesse o site do Centro Acadêmico de Sistemas de Informação para notícias e materiais."
      />

      <S.WebViewWrapper>
        {loading && (
          <S.WebViewLoading>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </S.WebViewLoading>
        )}
        <WebView
          source={{ uri: CASI_URL }}
          startInLoadingState={false}
          onLoadEnd={() => setLoading(false)}
        />
      </S.WebViewWrapper>

      <Button
        title="Abrir no navegador"
        type="PRIMARY"
        marginTop={16}
        onPress={() => Linking.openURL(CASI_URL)}
      />
    </ScreenContainer>
  );
}

