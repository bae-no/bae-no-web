import { localStorageHelper } from "./helper";

export const tokenStorage = localStorageHelper<{
  accessToken: string;
  refreshToken: string;
}>("tokenStorage");
