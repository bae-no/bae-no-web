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
            // TODO: localStorage token 가져오기 (임시로 token 넣으면 가능)
            // const token = localStorage.getItem("token");
            const token = "access token 입력";

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
    url: process.env.NEXT_PUBLIC_SERVER_URL as string,
  }),
  {
    ssr: true,
  },
);
