import { devtoolsExchange } from "@urql/devtools";
import { withUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange } from "urql";

import { tokenStorage } from "src/store/token";

import { authExchange } from "./authExchange";

export const withGraphql = withUrqlClient((ssr) => ({
  exchanges: [
    ssr,
    dedupExchange,
    cacheExchange,
    authExchange(() => {
      if (typeof window === "undefined") return "";

      return tokenStorage.get();
    }),
    fetchExchange,
    devtoolsExchange,
  ],
  suspense: true,
  url: process.env.NEXT_PUBLIC_SERVER_URL as string,
}));
