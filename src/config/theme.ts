export const theme = {
  font: {
    paragraph: {
      sm: {
        fontSize: 12,
        fontWeight: "400" as const,
        fontFamily: "Poppins_400Regular",
      },
      sm2: {
        fontSize: 14,
        fontWeight: "700" as const,
        fontFamily: "Poppins_700Bold",
      },
      md: {
        fontSize: 16,
        fontWeight: "400" as const,
        fontFamily: "Poppins_400Regular",
      },
      md2: {
        fontSize: 18,
        fontWeight: "600" as const,
        fontFamily: "Poppins_600SemiBold",
      },
      lg: {
        fontSize: 20,
        fontWeight: "400" as const,
        fontFamily: "Poppins_400Regular",
      },
      lg2: {
        fontSize: 24,
        fontWeight: "700" as const,
        fontFamily: "Poppins_700Bold",
      },
    },
    heading: {
      sm: {
        fontSize: 16,
        fontWeight: "700" as const,
        fontFamily: "Poppins_700Bold",
      },
      md: {
        fontSize: 20,
        fontWeight: "700" as const,
        fontFamily: "Poppins_700Bold",
      },
      lg: {
        fontSize: 28,
        fontWeight: "700" as const,
        fontFamily: "Poppins_700Bold",
      },
      xl: {
        fontSize: 32,
        fontWeight: "700" as const,
        fontFamily: "Poppins_700Bold",
      },
    },
  },
  colors: {
    primary: "#143359",
    secondary: "#586880",
    tertiary: "#FF231F7C",
    error: "#FF0000",
    background: "#FFFFFF",
    text: "#143359",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export type AppTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}

