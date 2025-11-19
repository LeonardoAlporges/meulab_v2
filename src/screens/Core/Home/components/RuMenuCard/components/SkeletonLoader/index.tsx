import React from "react";

import * as S from "./styles";

export const SkeletonLoader: React.FC = () => {
  return (
    <S.SkeletonCard>
      <S.SkeletonBlock style={{ width: "40%", height: 20 }} />
      <S.SkeletonBlock style={{ width: "60%", height: 14 }} />
      {["line1", "line2", "line3", "line4", "line5"].map((key) => (
        <S.SkeletonBlock key={key} />
      ))}
      <S.SkeletonBlock style={{ width: "100%", height: 44 }} />
    </S.SkeletonCard>
  );
};

