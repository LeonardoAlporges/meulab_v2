import { useCallback, useMemo, useState } from "react";

interface UseInputParams {
  secureTextEntry?: boolean;
  isMask?: boolean;
  maskType?: string;
  handleChangeText?: (text: string) => string;
}

export const useInput = ({
  secureTextEntry = false,
  isMask = false,
  maskType = "",
  handleChangeText,
}: UseInputParams) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry === true;

  const maskRegex = useMemo(() => {
    if (!maskType) return null;

    try {
      return new RegExp(maskType);
    } catch (error) {
      console.warn("Invalid mask regex pattern:", maskType);
      return null;
    }
  }, [maskType]);

  const applyMask = useCallback(
    (text: string): string => {
      if (!isMask || !maskRegex) {
        return text;
      }

      const match = maskRegex.exec(text);

      if (match) {
        return match[0];
      }

      return text;
    },
    [isMask, maskRegex]
  );

  const handleTextChange = useCallback(
    (text: string): string => {
      const processedText = handleChangeText ? handleChangeText(text) : text;
      return isMask ? applyMask(processedText) : processedText;
    },
    [applyMask, handleChangeText, isMask]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return {
    showPassword,
    togglePasswordVisibility,
    handleTextChange,
    isPasswordField,
  };
};
