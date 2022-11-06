import { reastorage } from "@reastorage/react";

export const locationStorage = reastorage("location", {
  jibunAddress: "",
  roadAddress: "",
});
