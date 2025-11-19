import styled from "@emotion/native";

import { theme } from "@config/theme";

export const Container = styled.View({
  marginTop: theme.spacing.md,
});

export const TabsScroll = styled.ScrollView({
  flexGrow: 0,
  marginBottom: theme.spacing.sm,
});

export const TabButton = styled.TouchableOpacity<{ active: boolean }>(
  ({ active }) => ({
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: active ? theme.colors.primary : "rgba(20, 51, 89, 0.2)",
    backgroundColor: active ? theme.colors.primary : theme.colors.background,
    marginRight: theme.spacing.sm,
  })
);

export const TabButtonText = styled.Text<{ active: boolean }>(({ active }) => ({
  color: active ? theme.colors.background : theme.colors.primary,
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
}));

export const SlotsContainer = styled.View({
  marginTop: theme.spacing.sm,
  gap: theme.spacing.md,
});

export const SlotCard = styled.View({
  backgroundColor: theme.colors.background,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.08)",
  padding: theme.spacing.md,
});

export const SlotHeader = styled.View({
  marginBottom: theme.spacing.sm,
});

export const SlotTime = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: theme.colors.primary,
});

export const SlotRow = styled.View({
  flexDirection: "row",
  paddingVertical: theme.spacing.xs,
  borderTopWidth: 1,
  borderTopColor: "rgba(20, 51, 89, 0.05)",
  alignItems: "flex-start",
});

export const SlotDay = styled.Text({
  width: 80,
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
  color: theme.colors.secondary,
});

export const SlotInfo = styled.View({
  flex: 1,
  paddingLeft: theme.spacing.sm,
});

export const DisciplineTitle = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm2.fontFamily,
  color: theme.colors.text,
});

export const DisciplineLocation = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.sm.fontFamily,
  color: theme.colors.secondary,
});
