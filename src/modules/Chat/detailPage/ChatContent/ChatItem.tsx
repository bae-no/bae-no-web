import { Box } from "src/ui/Box";

import { MyChat } from "./MyChat";
import { OtherChat } from "./OtherChat";

interface ChatItemProps {
  authorName: string;
  content: string;
  createdAt: Date;
  writtenByMe: boolean;
}

export const ChatItem = ({
  authorName,
  content,
  createdAt,
  writtenByMe,
}: ChatItemProps) => (
  <Box width="full">
    {writtenByMe ? (
      <MyChat createdAt={createdAt}>{content}</MyChat>
    ) : (
      <OtherChat authorName={authorName} createdAt={createdAt}>
        {content}
      </OtherChat>
    )}
  </Box>
);
