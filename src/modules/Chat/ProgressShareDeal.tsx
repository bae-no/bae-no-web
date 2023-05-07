import List from "src/components/List";
import { ShareDealStatus, useGetChatList } from "src/graphql";

import ChattingRoomsItem from "./ChattingList/ChattingRoomsItem";

interface ProgressShareDealProps {
  deleteMode: boolean;
}

export const ProgressShareDeal = ({ deleteMode }: ProgressShareDealProps) => {
  const { data } = useGetChatList(
    {
      input: {
        page: 0,
        size: 100,
        status: ShareDealStatus.Open,
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
          ended={false}
        />
      )}
    />
  );
};
