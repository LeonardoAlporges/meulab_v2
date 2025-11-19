import styled from "@emotion/native";

import { theme } from "@config/theme";

export const ContentContainer = styled.View({
  paddingHorizontal: 0,
  paddingVertical: theme.spacing.md,
  width: "100%",
});

export const TitleArea = styled.View({
  marginBottom: theme.spacing.md,
  paddingBottom: theme.spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: "rgba(20, 51, 89, 0.1)",
});

export const DataOcorrenciaTitle = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
  fontWeight: "700",
  color: theme.colors.secondary,
  marginBottom: theme.spacing.xs,
});

export const DataOcorrencia = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
});

export const DescricaoTitle = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
  fontWeight: "700",
  color: theme.colors.secondary,
  marginBottom: theme.spacing.xs,
});

export const DescricaoOcorrencia = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  lineHeight: 24,
});

export const ProvidenciasTitle = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
  fontWeight: "700",
  color: theme.colors.secondary,
  marginBottom: theme.spacing.xs,
});

export const Providencias = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  lineHeight: 24,
  fontStyle: "italic",
});

export const ButtonArea = styled.View({
  flexDirection: "column",
  gap: theme.spacing.sm,
  marginTop: theme.spacing.lg,
  width: "100%",
});

export const ButonStatus = styled.TouchableOpacity<{ status: string }>(
  ({ status }) => {
    let backgroundColor = theme.colors.primary;
    let borderColor = theme.colors.primary;

    switch (status) {
      case "resolvido":
        backgroundColor = "#4CAF50";
        borderColor = "#4CAF50";
        break;
      case "analise":
        backgroundColor = "#2196F3";
        borderColor = "#2196F3";
        break;
      case "deletar":
        backgroundColor = "#F44336";
        borderColor = "#F44336";
        break;
      default:
        break;
    }

    return {
      width: "100%",
      backgroundColor,
      borderRadius: 10,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 0,
      borderColor,
      minHeight: 54,
    };
  }
);

export const TitleButton = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "600",
  color: "#FFFFFF",
});

export const Linha = styled.View({
  marginTop: theme.spacing.md,
});

