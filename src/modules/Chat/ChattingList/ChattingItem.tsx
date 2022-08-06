import { memo } from "react";
import { useFormContext } from "react-hook-form";

import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { Avatar, Box, CheckBox, Label, Typography } from "src/ui";

const trailingActions = ({ onClick }: { onClick: () => void }) => (
  <TrailingActions>
    <SwipeAction onClick={onClick}>
      <Box
        as="button"
        backgroundColor="danger1"
        color="white"
        width="64"
        height="full"
        align="center"
        justify="center"
        paddingBottom="16"
      >
        나가기
      </Box>
    </SwipeAction>
  </TrailingActions>
);

export interface ChattingItemProps {
  avatarSrc: string;
  chattingId: string;
  ended: boolean;
  title: string;
  date: string;
  lastChat: string;
  notReadMessage: number;
  checkbox?: boolean;
}

const ChattingItem = ({
  avatarSrc,
  title,
  ended,
  chattingId,
  lastChat,
  date,
  notReadMessage,
  checkbox,
}: ChattingItemProps) => {
  const { setValue } = useFormContext();
  const onClickDelete = () => setValue(chattingId, true);
  return (
    <SwipeableList type={ListType.IOS} threshold={0.3}>
      <SwipeableListItem
        trailingActions={trailingActions({ onClick: onClickDelete })}
      >
        <Box
          align="center"
          as="li"
          direction="row"
          justify="space-between"
          width="full"
          gap="32"
          key={chattingId}
        >
          <Box align="center" direction="row" gap="16" width="max">
            {checkbox && (
              <CheckBox
                id={chattingId}
                value={chattingId}
                onCheckedChange={() => setValue("chats", chattingId)}
              />
            )}
            <Avatar size="48" src={avatarSrc} />
            <Box as="span" gap="2">
              <Typography fontSize="body1-b">{title}</Typography>
              <Typography fontSize="body2-m" color="black2">
                {lastChat}
              </Typography>
            </Box>
          </Box>
          <Box
            as="span"
            align="flex-end"
            justify="space-between"
            gap="5.5"
            {...(ended && { paddingBottom: "32" })}
          >
            <Typography fontSize="caption1-m" color="black4">
              {date}
            </Typography>
            {!ended && (
              <Label color="primary" variant="border">
                <Typography fontSize="caption1-m">{notReadMessage}</Typography>
              </Label>
            )}
          </Box>
        </Box>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default memo(ChattingItem);
