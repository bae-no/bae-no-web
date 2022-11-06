import { reastorage } from "@reastorage/react";
import { withUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange } from "urql";

import { authExchange } from "./authExchange";

// FIXME: 위치 변경 필요
const accessToken = reastorage("token", "").get();

export const withGraphql = withUrqlClient((ssr) => ({
  exchanges: [
    ssr,
    dedupExchange,
    cacheExchange,
    authExchange(() => {
      if (typeof window === "undefined") return "";

      return accessToken;
    }),
    fetchExchange,
  ],
  suspense: true,
  url: process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER_URL as string,
}));
