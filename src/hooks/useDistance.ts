import { useMemo } from "react";

import {
  Coordinate,
  getDistanceFromCoordinates,
} from "src/utils/getDistanceFromCoordinates";

import useCurrentLocation from "./useCurrentLocation";

export const useDistance = (coordinate?: Coordinate) => {
  const location = useCurrentLocation();

  return useMemo(() => {
    if (!location.latitude || !location.longitude || !coordinate) return null;
    return getDistanceFromCoordinates(location, coordinate);
  }, [location, coordinate]);
};
