import { DocumentNode } from "graphql";
import { GetServerSidePropsContext } from "next";
import { initUrqlClient } from "next-urql";
import {
  AnyVariables,
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

import { authExchange } from "./authExchange";

export const prefetchQueryOnServerSide =
  (
    document: DocumentNode,
    variables: (context: GetServerSidePropsContext) => AnyVariables,
  ) =>
  async (context: GetServerSidePropsContext) => {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient(
      {
        exchanges: [
          authExchange(() => context.req.cookies?.token ?? ""),
          dedupExchange,
          cacheExchange,
          ssrCache,
          fetchExchange,
        ],
        url: process.env.NEXT_PUBLIC_SERVER_URL as string,
      },
      false,
    );

    await client?.query(document, variables(context)).toPromise();

    return {
      props: {
        urqlState: ssrCache.extractData(),
      },
    };
  };
