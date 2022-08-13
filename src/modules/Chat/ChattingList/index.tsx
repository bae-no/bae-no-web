import { IntersectionArea } from "src/components";
import { Box } from "src/ui";

import ChattingItem, { ChattingItemProps } from "./ChattingItem";

interface ChattingListProps {
  chattings: ChattingItemProps[];
  fetchMore: (lastId: ChattingItemProps["chattingId"]) => void;
}

const ChattingList = ({ chattings, fetchMore }: ChattingListProps) => {
  const handleFetchMore: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      fetchMore(chattings.at(-1)!.chattingId);
    }
  };

  return (
    <Box as="ol">
      {chattings.map((chatting) => (
        <ChattingItem key={chatting.chattingId} {...chatting} />
      ))}
      <IntersectionArea onIntersect={handleFetchMore}>
        <div />
      </IntersectionArea>
    </Box>
  );
};

export default ChattingList;
