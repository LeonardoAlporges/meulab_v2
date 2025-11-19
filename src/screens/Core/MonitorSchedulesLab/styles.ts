import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@config/theme";

export const DaysContainer = styled.View({
  flexDirection: "row",
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.md,
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

export const ScheduleList = styled.View({
  paddingBottom: theme.spacing.lg,
});

export const ScheduleCard = styled.View<{ hasMonitor: boolean }>(
  ({ hasMonitor }) => ({
    backgroundColor: hasMonitor ? "#E8F5E9" : "#F5F5F5",
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: hasMonitor ? 2 : 1,
    borderColor: hasMonitor ? "#4CAF50" : "rgba(20, 51, 89, 0.1)",
    shadowColor: hasMonitor ? "#4CAF50" : "#000",
    shadowOffset: { width: 0, height: hasMonitor ? 2 : 1 },
    shadowOpacity: hasMonitor ? 0.2 : 0.1,
    shadowRadius: hasMonitor ? 4 : 2,
    elevation: hasMonitor ? 3 : 1,
  })
);

export const HourContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.xs,
});

export const HourIcon = styled(MaterialIcons)({
  fontSize: 20,
  color: theme.colors.primary,
  marginRight: theme.spacing.xs,
});

export const HourText = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: theme.colors.primary,
  minWidth: 60,
});

export const MonitorContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginTop: theme.spacing.xs,
});

export const MonitorIcon = styled(MaterialIcons)({
  fontSize: 18,
  color: "#4CAF50",
  marginRight: theme.spacing.xs,
});

export const MonitorIconDisabled = styled(MaterialIcons)({
  fontSize: 18,
  color: "#999",
  marginRight: theme.spacing.xs,
});

export const MonitorName = styled.Text({
  fontSize: theme.font.paragraph.md.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  flex: 1,
});

export const AvailableBadge = styled.View({
  backgroundColor: "#9E9E9E",
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs,
  borderRadius: 12,
  marginLeft: theme.spacing.sm,
  flexDirection: "row",
  alignItems: "center",
});

export const AvailableIcon = styled(MaterialIcons)({
  fontSize: 14,
  color: "#FFFFFF",
  marginRight: 4,
});

export const AvailableText = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: "#FFFFFF",
  fontWeight: "600",
});

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

export const StatsCard = styled.View({
  backgroundColor: theme.colors.background,
  borderRadius: 8,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.md,
  borderWidth: 1,
  borderColor: "rgba(20, 51, 89, 0.1)",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
});

export const StatItem = styled.View({
  alignItems: "center",
  flex: 1,
});

export const StatValue = styled.Text({
  fontSize: theme.font.paragraph.lg2.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: theme.colors.primary,
  marginBottom: theme.spacing.xs,
});

export const StatValueSuccess = styled.Text({
  fontSize: theme.font.paragraph.lg2.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: "#4CAF50",
  marginBottom: theme.spacing.xs,
});

export const StatLabel = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  textAlign: "center",
});

export const StatIcon = styled(MaterialIcons)({
  fontSize: 24,
  color: theme.colors.primary,
  marginBottom: theme.spacing.xs,
});

export const StatIconSuccess = styled(MaterialIcons)({
  fontSize: 24,
  color: "#4CAF50",
  marginBottom: theme.spacing.xs,
});

export const MultipleMonitorsBadge = styled.View({
  backgroundColor: "#FF9800",
  paddingHorizontal: theme.spacing.xs,
  paddingVertical: 2,
  borderRadius: 10,
  marginLeft: theme.spacing.xs,
});

export const MultipleMonitorsText = styled.Text({
  fontSize: 10,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  color: "#FFFFFF",
  fontWeight: "700",
});

export const IntervalCard = styled.View({
  backgroundColor: "#E3F2FD",
  borderRadius: 8,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.md,
  borderWidth: 2,
  borderColor: "#2196F3",
  shadowColor: "#2196F3",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
});

export const IntervalHeader = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.sm,
});

export const IntervalIcon = styled(MaterialIcons)({
  fontSize: 24,
  color: "#2196F3",
  marginRight: theme.spacing.sm,
});

export const IntervalTitle = styled.Text({
  fontSize: theme.font.paragraph.md2.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: "#2196F3",
  flex: 1,
});

export const IntervalContent = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const IntervalTime = styled.View({
  flex: 1,
});

export const IntervalTimeLabel = styled.Text({
  fontSize: theme.font.paragraph.sm.fontSize,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: theme.colors.text,
  marginBottom: theme.spacing.xs,
});

export const IntervalTimeValue = styled.Text({
  fontSize: theme.font.paragraph.lg.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: "#2196F3",
});

export const IntervalDuration = styled.View({
  alignItems: "center",
  backgroundColor: "#2196F3",
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
  borderRadius: 8,
  marginLeft: theme.spacing.md,
});

export const IntervalDurationValue = styled.Text({
  fontSize: theme.font.paragraph.lg2.fontSize,
  fontFamily: theme.font.paragraph.md2.fontFamily,
  fontWeight: "700",
  color: "#FFFFFF",
});

export const IntervalDurationLabel = styled.Text({
  fontSize: 10,
  fontFamily: theme.font.paragraph.md.fontFamily,
  color: "#FFFFFF",
  marginTop: 2,
});

