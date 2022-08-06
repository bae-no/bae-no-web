import { memo } from "react";

import "react-swipeable-list/dist/styles.css";
import { useFormContext } from "react-hook-form";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";

import { Avatar, Box, CheckBox, Label, Typography } from "src/ui";

const trailingActions = ({ onClick }: { onClick: () => void }) => (
  <TrailingActions>
    <SwipeAction onClick={onClick}>
      <Box
        align="center"
        as="button"
        backgroundColor="danger1"
        color="white"
        height="full"
        justify="center"
        paddingBottom="16"
        width="64"
      >
        나가기
      </Box>
    </SwipeAction>
  </TrailingActions>
);

export interface ChattingItemProps {
  avatarSrc: string;
  chattingId: string;
  checkbox?: boolean;
  date: string;
  ended: boolean;
  lastChat: string;
  notReadMessage: number;
  title: string;
}

const ChattingItem = ({
  avatarSrc,
  chattingId,
  checkbox,
  date,
  ended,
  lastChat,
  notReadMessage,
  title,
}: ChattingItemProps) => {
  const { setValue } = useFormContext();
  const onClickDelete = () => setValue(chattingId, true);
  return (
    <SwipeableList threshold={0.3} type={ListType.IOS}>
      <SwipeableListItem
        trailingActions={trailingActions({ onClick: onClickDelete })}
      >
        <Box
          align="center"
          as="li"
          direction="row"
          gap="32"
          justify="space-between"
          key={chattingId}
          width="full"
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
              <Typography color="black2" fontSize="body2-m">
                {lastChat}
              </Typography>
            </Box>
          </Box>
          <Box
            align="flex-end"
            as="span"
            gap="5.5"
            justify="space-between"
            {...(ended && { paddingBottom: "32" })}
          >
            <Typography color="black4" fontSize="caption1-m">
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
