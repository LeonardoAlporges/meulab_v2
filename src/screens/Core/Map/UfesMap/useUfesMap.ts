import { useEffect, useMemo, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import { mapCategories } from "./geojson/ufesMapPoints";

export interface MapPoint {
  name: string;
  coordinates: [number, number];
}

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export interface MapCategory {
  name: string;
  icon: MaterialIconName;
  points: MapPoint[];
}

export const useUfesMap = () => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const categories = useMemo<MapCategory[]>(() => mapCategories, []);

  const allPoints = useMemo<MapPoint[]>(
    () => categories.flatMap((category) => category.points),
    [categories]
  );

  useEffect(() => {
    if (!selectedPoint && allPoints.length > 0) {
      setSelectedPoint(allPoints[0]);
    }
  }, [allPoints, selectedPoint]);

  const handleSelectPoint = (point: MapPoint) => {
    setSelectedPoint(point);
  };

  const mapUrl = selectedPoint
    ? `https://www.google.com/maps/search/?api=1&query=${selectedPoint.coordinates[1]},${selectedPoint.coordinates[0]}`
    : "https://www.google.com/maps/d/u/0/viewer?mid=1MidKiIv_2cGcV17Hkva5TOaBCRI&ll=-20.76209320000001%2C-41.536535900000004&z=18";

  return {
    categories,
    selectedPoint,
    mapUrl,
    handleSelectPoint,
  };
};

