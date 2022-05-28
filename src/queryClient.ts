import { QueryClient } from "react-query";
import { createMutationToolkit, createQueryToolkit } from "react-query-toolkit";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export const queryToolkit = createQueryToolkit(queryClient);

export const mutationToolkit = createMutationToolkit(queryClient);
