import { createClient } from "graphql-ws";
import WebSocket from "isomorphic-ws";

import { getCookie } from "./cookie";

export function subscribeToNewMessages<
  T extends Record<string, unknown> | null | undefined,
  K,
>(variables: T, query: string, callback: (data: K) => void) {
  const socketClient = createClient({
    connectionParams: {
      authorization: `Bearer ${getCookie("token")}`,
    },
    url: process.env.NEXT_PUBLIC_WEBSOCKET_URL as string,
    webSocketImpl: WebSocket,
  });

  return socketClient.subscribe(
    {
      query,
      variables,
    },
    {
      complete: () => {},
      error: () => {},
      next: ({ data }: { data: K }) => {
        callback(data);
      },
    },
  );
}
