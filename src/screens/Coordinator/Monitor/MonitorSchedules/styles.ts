import styled from "@emotion/native";

import { theme } from "@config/theme";

export const DaysContainer = styled.View({
  flexDirection: "row",
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.md,
  paddingHorizontal: theme.spacing.xs,
});

export const DayButton = styled.TouchableOpacity<{ active: boolean }>(
  ({ active }) => ({
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: 8,
    backgroundColor: active ? theme.colors.primary : theme.colors.background,
    borderWidth: 1,
    borderColor: active ? theme.colors.primary : "rgba(20, 51, 89, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  })
);

export const DayButtonText = styled.Text<{ active: boolean }>(({ active }) => ({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: active ? "#FFFFFF" : theme.colors.text,
  fontWeight: active ? "600" : "400",
}));

export const HoursGrid = styled.View({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing.md,
  paddingHorizontal: theme.spacing.md,
  paddingBottom: theme.spacing.lg,
});

export const HourCard = styled.TouchableOpacity<{ selected: boolean }>(
  ({ selected }) => ({
    width: "30%",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: 8,
    backgroundColor: selected ? "#4A90E2" : theme.colors.background,
    borderWidth: 2,
    borderColor: selected ? "#4A90E2" : "rgba(20, 51, 89, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
    shadowColor: selected ? "#4A90E2" : "transparent",
    shadowOffset: selected ? { width: 0, height: 2 } : { width: 0, height: 0 },
    shadowOpacity: selected ? 0.3 : 0,
    shadowRadius: selected ? 4 : 0,
    elevation: selected ? 3 : 0,
  })
);

export const HourText = styled.Text<{ selected: boolean }>(({ selected }) => ({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: selected ? "#FFFFFF" : theme.colors.text,
  fontWeight: selected ? "700" : "400",
}));

export const EmptyContainer = styled.View({
  padding: theme.spacing.xl,
  alignItems: "center",
  justifyContent: "center",
});

export const EmptyText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: "#999",
  textAlign: "center",
});
