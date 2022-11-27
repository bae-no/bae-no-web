import { reastorage } from "@reastorage/react";

export const positionStorage = reastorage("position", {
  latitude: 0,
  longitude: 0,
});
