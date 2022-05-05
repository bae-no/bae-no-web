import ky, { HTTPError } from "ky-universal";
import { ServerResponseBase } from "src/types";

import { getCookie } from "src/utils/getCookie";
import { tokenStorage } from "./localStorage";

type RefreshTokenResponse = ServerResponseBase<{
  accessToken: string;
  refreshToken: string;
}>;

export const SERVER_BASE_URL = "http://localhost:3000/api/";

export const getToken = async () => {
  const prevTokens = tokenStorage.get() || {
    accessToken: getCookie("x-auth-cookie"),
    refreshToken: getCookie("x-auth-cookie-refresh"),
  };

  try {
    const {
      response: { accessToken, refreshToken },
    } = await ky
      .post(`${SERVER_BASE_URL}v1/auths/refresh`, {
        headers: {
          Authorization: `Bearer ${prevTokens.accessToken}`,
        },
        json: {
          refresh: prevTokens.refreshToken,
        },
      })
      .json<RefreshTokenResponse>();
    document.cookie = `x-auth-cookie=${accessToken};`;

    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof HTTPError) {
      const res = await error.response.json();
      if (res.error.message === "Access token is not expired!") {
        tokenStorage.set(prevTokens);
        return prevTokens;
      }
    }
    throw error;
  }
};

export const kyInstance = ky.extend({
  prefixUrl: SERVER_BASE_URL,
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getCookie("x-auth-cookie");
        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    afterResponse: [
      async (request, _, response) => {
        const { error } = await response.json();
        if (
          global.window &&
          response.status === 401 &&
          error.message === "jwt expired"
        ) {
          const { accessToken } = await getToken();
          request.headers.set("Authorization", `Bearer ${accessToken}`);

          return ky(request, { retry: 0 });
        }
      },
    ],
  },
});
