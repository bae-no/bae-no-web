import { IntersectionArea } from "src/components";
import { Box } from "src/ui";
import { Sprinkles } from "src/ui/sprinkles.css";

import ChattingRoomsItem, { ChattingRoomsItemProps } from "./ChattingRoomsItem";

interface ChattingRoomsListProps {
  chattings: ChattingRoomsItemProps[];
  checkbox?: boolean;
  fetchMore: (lastId: ChattingRoomsItemProps["chattingId"]) => void;
  gap?: Sprinkles["gap"];
}

const ChattingRoomsList = ({
  chattings,
  checkbox,
  fetchMore,
  gap = "16",
}: ChattingRoomsListProps) => {
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

export default ChattingRoomsList;
