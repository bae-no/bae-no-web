import { reastorage } from "@reastorage/react";

export const locationStorage = reastorage(
  "location",
  {
    jibunAddress: "",
    roadAddress: "",
  },
  {
    storage: "session",
  },
);

export const nickNameStorage = reastorage("nickName", "", {
  storage: "session",
});

export const positionStorage = reastorage(
  "position",
  {
    latitude: 0,
    longitude: 0,
  },
  {
    storage: "session",
  },
);
