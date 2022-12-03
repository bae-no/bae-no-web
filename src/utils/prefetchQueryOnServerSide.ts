import { dehydrate, QueryClient, QueryKey } from "@tanstack/react-query";

export const prefetchQueryOnServerSide = async <T>(
  queryKey: QueryKey,
  fetcher: () => Promise<T>,
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKey, fetcher, { staleTime: Infinity });

  return { dehydratedState: dehydrate(queryClient), queryClient };
};
