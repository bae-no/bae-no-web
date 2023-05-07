import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";
import { formatDate } from "src/utils/date";

import { chatContentTextCss } from "./chatContent.css";

interface OtherChatProps {
  authorName: string;
  children: string;
  createdAt: Date;
}

export const OtherChat = ({
  authorName,
  children,
  createdAt,
}: OtherChatProps) => (
  <Box flexDirection="row" gap="8">
    <Avatar size="40" text={authorName} />
    <Box>
      <Typography fontSize="body3-b">{authorName}</Typography>
      <Box bg="black9" br="24" className={chatContentTextCss} px="16" py="12">
        <Typography color="black2" fontSize="body2-m">
          {children}
        </Typography>
      </Box>
    </Box>
    <Box justifyContent="flex-end">
      <Typography color="black3" fontSize="caption2-m">
        {formatDate(createdAt, "am/pm h:mm")}
      </Typography>
    </Box>
  </Box>
);
