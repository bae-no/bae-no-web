import { dehydrate, QueryClient, QueryKey } from "@tanstack/react-query";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

import { getCookie } from "./cookie";

type InferVariables<T> = T extends (
  variables: infer V,
  options?: RequestInit["headers"],
) => any
  ? V
  : never;

interface QueryHook {
  fetcher: (
    variables: any,
    options?: RequestInit["headers"],
  ) => () => Promise<any>;
  getKey: (variables: any) => QueryKey;
}

interface QueryHookReturns {
  fetch: ReturnType<QueryHook["fetcher"]>;
  key: ReturnType<QueryHook["getKey"]>;
}

export const prefetchQueryOnServerSide = async (
  queries: Array<QueryHookReturns>,
) => {
  const queryClient = new QueryClient();
  await Promise.all(
    queries.map(async ({ fetch, key }) => {
      await queryClient.prefetchQuery(key, fetch);
    }),
  );

  return { dehydratedState: dehydrate(queryClient), queryClient };
};

interface GetServerSideQuery<
  TQueryHook extends QueryHook,
  TContext extends GetServerSidePropsContext | GetStaticPropsContext,
> {
  getParams?: (ctx: TContext) => {
    options?: RequestInit["headers"];
    variables: InferVariables<TQueryHook["fetcher"]>;
  };
  queryHook: TQueryHook;
}

// prettier-ignore
export const prefetchQueriesOnServerSide = <TQueryHook extends Array<QueryHook>, TContext extends  GetServerSidePropsContext | GetStaticPropsContext>(
  queryObjects: Array<GetServerSideQuery<TQueryHook[number],TContext>>,
) => async (context: TContext) => {
  const token = getCookie('token', (context as GetServerSidePropsContext).req?.cookies);
  
  const { dehydratedState } = await prefetchQueryOnServerSide(
    queryObjects.map(({ queryHook, getParams }) => {
      const {
        options,
        variables,
      } = getParams?.(context) ?? {};
      return {
        fetch: queryHook.fetcher(variables, {...options, ...(token ? { Authorization: `Bearer ${token}` } : {})}),
        key: queryHook.getKey(variables),
      };
    }),
  );
  return {
    props: {
      dehydratedState,
    },
  };
};

// prettier-ignore
export const prefetchQueriesOnServerSideWithAuth = <TQueryHook extends Array<QueryHook>, TContext extends  GetServerSidePropsContext>(
    queryObjects: Array<GetServerSideQuery<TQueryHook[number],TContext>>,
  ) =>
  async (context: TContext) => {
    const { token } = context.req.cookies;
    if (!token) return { redirect: { destination: "/login", permanent: true } };

    return prefetchQueriesOnServerSide(queryObjects)(context);
  };
