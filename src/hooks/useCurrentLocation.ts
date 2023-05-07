import { useEffect, useSyncExternalStore } from "react";

import { Coordinate } from "src/utils/getDistanceFromCoordinates";

const locationCache = (() => {
  const listeners = new Set<(location: Coordinate) => void>();
  let coords = {} as Coordinate;

  const subscribe = (listener: (location: Coordinate) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const setCoords = (newCoords: Coordinate) => {
    coords = newCoords;
    listeners.forEach((listener) => listener(coords));
  };

  const getCoords = () => coords;

  return {
    getCoords,
    setCoords,
    subscribe,
  };
})();

const useCurrentLocation = () => {
  const location = useSyncExternalStore(
    locationCache.subscribe,
    locationCache.getCoords,
    locationCache.getCoords,
  );
  useEffect(() => {
    const setCoords = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        locationCache.setCoords(position.coords);
      });
    };
    if (!location.latitude || !location.longitude) {
      setCoords();
    }
    window.addEventListener("focus", setCoords);
    return () => {
      window.removeEventListener("focus", setCoords);
    };
  }, [location]);

  return useSyncExternalStore(
    locationCache.subscribe,
    locationCache.getCoords,
    locationCache.getCoords,
  );
};

export default useCurrentLocation;
