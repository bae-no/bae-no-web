import { authExchange as urqlAuthExchange } from "@urql/exchange-auth";
import { makeOperation } from "urql";

export const authExchange = (getToken: () => string) =>
  urqlAuthExchange<{ token: string }>({
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
      if (authState) return null;
      const accessToken = getToken();

      return {
        token: `Bearer ${accessToken}`,
      };
    },
  });
