import React from "react";

import * as S from "../styles";

interface LongestInterval {
  start: string;
  end: string;
  duration: number;
}

interface LongestIntervalCardProps {
  longestInterval: LongestInterval | null;
}

export const LongestIntervalCard: React.FC<LongestIntervalCardProps> = ({
  longestInterval,
}) => {
  if (!longestInterval || longestInterval.duration <= 1) return null;

  return (
    <S.IntervalCard>
      <S.IntervalHeader>
        <S.IntervalIcon name="access-time" />
        <S.IntervalTitle>Maior Intervalo Contínuo</S.IntervalTitle>
      </S.IntervalHeader>
      <S.IntervalContent>
        <S.IntervalTime>
          <S.IntervalTimeLabel>Início</S.IntervalTimeLabel>
          <S.IntervalTimeValue>{longestInterval.start}</S.IntervalTimeValue>
        </S.IntervalTime>
        <S.IntervalTime>
          <S.IntervalTimeLabel>Fim</S.IntervalTimeLabel>
          <S.IntervalTimeValue>{longestInterval.end}</S.IntervalTimeValue>
        </S.IntervalTime>
        <S.IntervalDuration>
          <S.IntervalDurationValue>
            {longestInterval.duration}
          </S.IntervalDurationValue>
          <S.IntervalDurationLabel>
            {longestInterval.duration === 1 ? "hora" : "horas"}
          </S.IntervalDurationLabel>
        </S.IntervalDuration>
      </S.IntervalContent>
    </S.IntervalCard>
  );
};

