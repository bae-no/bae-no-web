import { useEffect, useState } from "react";

import { GetChatDetail } from "src/graphql";
import { subscribeToNewMessages } from "src/utils/websocket";

export const useSubscriptionChat = <
  T extends Record<string, unknown> | null | undefined,
>({
  variables,
  query,
}: {
  query: string;
  variables: T;
}) => {
  const [data, setData] = useState<GetChatDetail["chatDetail"]>();

  useEffect(() => {
    const unsubscribe = subscribeToNewMessages<
      T,
      { chatWrite: GetChatDetail["chatDetail"][number] }
    >(
      variables,
      query,
      (newData: { chatWrite: GetChatDetail["chatDetail"][number] }) => {
        setData((prevData) => {
          if (prevData) {
            return [...prevData, newData.chatWrite];
          }

          return [newData.chatWrite];
        });
      },
    );

    return () => unsubscribe();
  }, [data, query, variables]);

  return { data };
};
