import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";
import { formatDate } from "src/utils/date";

import { chatContentTextCss } from "./chatContent.css";

interface MyChatProps {
  children: string;
  createdAt: Date;
}

export const MyChat = ({ children, createdAt }: MyChatProps) => (
  <Box
    alignItems="flex-end"
    flexDirection="row"
    gap="8"
    justifyContent="flex-end"
  >
    <Typography color="black3" fontSize="caption2-m">
      {formatDate(createdAt, "am/pm h:mm")}
    </Typography>
    <Box bg="orange3" br="24" className={chatContentTextCss} px="16" py="12">
      <Typography color="white" fontSize="body2-m">
        {children}
      </Typography>
    </Box>
  </Box>
);
