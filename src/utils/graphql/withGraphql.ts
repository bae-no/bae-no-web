import { authExchange } from "@urql/exchange-auth";
import { withUrqlClient } from "next-urql";
import {
  makeOperation,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";

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
            const token = localStorage.getItem("token");

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
    url: "https://bae-no-server.fly.dev/graphql",
  }),
  {
    ssr: true,
  },
);
