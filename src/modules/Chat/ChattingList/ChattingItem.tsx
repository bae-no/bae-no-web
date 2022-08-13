import { memo } from "react";

import { Avatar, Box, Label, Typography } from "src/ui";

export interface ChattingItemProps {
  avatarSrc: string;
  category: string;
  chattingId: string;
  currentAttendee: number;
  deliveryFee: number;
  distance: number;
  ended: boolean;
  maxAttendee: number;
  title: string;
}

const ChattingItem = ({
  avatarSrc,
  category,
  currentAttendee,
  deliveryFee,
  distance,
  maxAttendee,
  title,
  ended,
  chattingId,
}: ChattingItemProps) => (
  <Box
    align="center"
    as="li"
    direction="row"
    justify="space-between"
    key={chattingId}
  >
    <Box align="center" direction="row" gap="16">
      <Avatar size="48" src={avatarSrc} />
      <Box as="span">
        <Typography fontSize="body1-b">{title}</Typography>
        <Typography color="black4" fontSize="caption1-m">
          {category}・배달비 {deliveryFee.toLocaleString()}원・거리 {distance}km
        </Typography>
      </Box>
    </Box>
    <Label color={ended ? "gray" : "orange"}>
      {ended ? "마감" : `${currentAttendee}명 / ${maxAttendee}명`}
    </Label>
  </Box>
);

export default memo(ChattingItem);
