import { memo } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box } from "src/ui/Box";
import { MotionBox } from "src/ui/Box/MotionBox";
import { CheckBox } from "src/ui/CheckBox";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

import { useNotificationDeleteFormContext } from "../useNotificationForm";

import ChatIcon from "./chat.svg";

dayjs.extend(relativeTime);

interface NotificationListItemProps {
  deleteMode: boolean;
  notification: {
    createdAt: string;
    desc?: string;
    id: string;
    message: string;
    title: string;
    type: string;
  };
}

const NotificationListItem = memo(
  ({
    notification: { createdAt, message, title, type, desc, id },
    deleteMode,
  }: NotificationListItemProps) => {
    const dateString = dayjs(createdAt, "YYYY-MM-DD HH:mm", "ko")
      .locale("ko")
      .fromNow();
    const { setValue } = useNotificationDeleteFormContext();

    const isChat = type === "chat";

    return (
      <Box as="li" flexDirection="row" position="relative">
        {deleteMode && (
          <CheckBox
            aria-label="삭제할 아이템 추가"
            css={{
              left: "0",
              position: "absolute",
              top: "8",
            }}
            id={id}
            value={id}
            onCheckedChange={(checked) => setValue(id, Boolean(checked))}
          >
            <Icon color="black9" name="checkbox" />
          </CheckBox>
        )}
        <MotionBox
          animate={deleteMode ? { x: "4rem" } : { x: 0 }}
          as="span"
          flexDirection="row"
          gap="8"
        >
          {isChat && <ChatIcon />}
          <Box as="span" gap="4">
            <Typography>
              {isChat && (
                <Typography as="strong" fontSize="body1-b">
                  [공유딜]{" "}
                </Typography>
              )}
              {title && `[${title}]`}
              {message}
            </Typography>
            <Box gap="8">
              {desc && (
                <Typography color="black2" fontSize="caption1-m">
                  {desc}
                </Typography>
              )}
              <Typography color="black4" fontSize="caption1-m">
                {dateString}
              </Typography>
            </Box>
          </Box>
        </MotionBox>
      </Box>
    );
  },
);

export default NotificationListItem;
