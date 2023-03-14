import List from "src/components/List";
import { ShareDealStatus, useGetChatList } from "src/graphql";

import ChattingRoomsItem from "./ChattingList/ChattingRoomsItem";

interface CompletedShareDealProps {
  deleteMode: boolean;
}

export const CompletedShareDeal = ({ deleteMode }: CompletedShareDealProps) => {
  const { data } = useGetChatList(
    {
      input: {
        page: 0,
        size: 100,
        status: ShareDealStatus.End,
      },
    },
    {
      suspense: true,
    },
  );

  return (
    <List
      as="ol"
      list={data?.chats ?? []}
      renderItem={(item) => (
        <ChattingRoomsItem
          checkbox={deleteMode}
          key={item.id}
          {...item}
          ended
        />
      )}
    />
  );
};
