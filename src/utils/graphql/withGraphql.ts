import { authExchange } from "@urql/exchange-auth";
import { withUrqlClient } from "next-urql";
import {
  makeOperation,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";

import { localStorageHelper } from "../localStorage/helper";

export const withGraphql = withUrqlClient(
  (ssrExchange) => ({
    exchanges: [
      authExchange<{ token: string }>({
        addAuthToOperation: ({ authState, operation }) => {
          if (!authState || !authState.token) {
            return operation;
          }

          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};
          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: authState.token,
              },
            },
          });
        },
        didAuthError: ({ error }) =>
          error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN"),
        getAuth: async ({ authState }) => {
          if (!authState) {
            const { get } = localStorageHelper<string>("token");
            const token = get();

            if (!token) return null;
            return {
              token: `Bearer ${token}`,
            };
          }

          return null;
        },
      }),
      dedupExchange,
      cacheExchange,
      ssrExchange,
      fetchExchange,
    ],
    suspense: true,
    url: process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER_URL as string,
  }),
  {
    ssr: true,
  },
);
