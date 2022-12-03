import { reastorage } from "@reastorage/react";

export const nickNameStorage = reastorage("nickName", "", {
  storage: "session",
});
