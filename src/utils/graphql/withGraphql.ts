import { withUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange } from "urql";

import { token } from "src/store/token";

import { authExchange } from "./authExchange";

export const withGraphql = withUrqlClient((ssr) => ({
  exchanges: [
    ssr,
    dedupExchange,
    cacheExchange,
    authExchange(() => {
      if (typeof window === "undefined") return "";

      return token.get();
    }),
    fetchExchange,
  ],
  suspense: true,
  url: process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER_URL as string,
}));
