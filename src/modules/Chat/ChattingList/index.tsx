import { IntersectionArea } from "src/components";
import { Box } from "src/ui";
import { Sprinkles } from "src/ui/sprinkles.css";

import ChattingItem, { ChattingItemProps } from "./ChattingItem";

interface ChattingListProps {
  chattings: ChattingItemProps[];
  fetchMore: (lastId: ChattingItemProps["chattingId"]) => void;
  gap?: Sprinkles["gap"];
}

const ChattingList = ({
  chattings,
  fetchMore,
  gap = "16",
}: ChattingListProps) => {
  const handleFetchMore: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      fetchMore(chattings.at(-1)!.chattingId);
    }
  };

  return (
    <Box as="ol" gap={gap}>
      {chattings.map((chatting) => (
        <ChattingItem key={chatting.chattingId} {...chatting} />
      ))}
      <IntersectionArea onIntersect={handleFetchMore}>
        <li />
      </IntersectionArea>
    </Box>
  );
};

export default ChattingList;
