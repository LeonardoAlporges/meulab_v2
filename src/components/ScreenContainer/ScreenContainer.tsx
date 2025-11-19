import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ViewProps,
} from "react-native";

import { Header } from "@components/index";

import * as S from "./styles";

interface ScreenContainerProps extends ViewProps {
  scrollable?: boolean;
  goBack?: boolean;
  previousScreenName?: string;
  onPressBackCustom?: () => void;
  title?: string;
  children: React.ReactNode;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = true,
  goBack = false,
  previousScreenName,
  onPressBackCustom,
  title,
  children,
  style,
  ...rest
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (onPressBackCustom) {
      onPressBackCustom();
    } else {
      navigation.goBack();
    }
  };

  const showHeader = goBack && previousScreenName && title;

  return (
    <S.Container style={style} {...rest}>
      {showHeader && (
        <Header title={title || ""} onNavigation={handleGoBack} />
      )}
      {scrollable ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={S.scrollContentStyle}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >
            <S.Content>{children}</S.Content>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <S.Content>{children}</S.Content>
      )}
    </S.Container>
  );
};

