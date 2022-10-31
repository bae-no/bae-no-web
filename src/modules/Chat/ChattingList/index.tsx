import { IntersectionArea } from "src/components/IntersectionArea";
import { Box } from "src/ui/Box";
import { Sprinkles } from "src/ui/sprinkles.css";

import ChattingItem, { ChattingItemProps } from "./ChattingItem";
import ChattingRoomsItem, { ChattingRoomsItemProps } from "./ChattingRoomsItem";

interface ChattingListProps {
  chattings: ChattingItemProps[] | ChattingRoomsItemProps[];
  checkbox?: boolean;
  fetchMore: (lastId: ChattingItemProps["chattingId"]) => void;
  gap?: Sprinkles["gap"];
  type?: "home" | "roomList";
}

const ChattingList = ({
  chattings,
  checkbox,
  fetchMore,
  gap,
  type = "home",
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
      {type === "home" &&
        (chattings as ChattingItemProps[]).map((chatting) => (
          <ChattingItem key={chatting.chattingId} {...chatting} />
        ))}

      {type === "roomList" &&
        (chattings as ChattingRoomsItemProps[]).map((chatting) => (
          <ChattingRoomsItem
            checkbox={checkbox}
            key={chatting.chattingId}
            {...chatting}
          />
        ))}
      <IntersectionArea onIntersect={handleFetchMore}>
        <li />
      </IntersectionArea>
    </Box>
  );
};

export default ChattingList;
