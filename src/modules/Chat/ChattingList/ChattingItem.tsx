import { memo } from "react";

import Link from "next/link";

import { FindShareDealQuery, ShareDealStatus } from "src/graphql";
import { useDistance } from "src/hooks/useDistance";
import { InferArray } from "src/types";
import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";

export interface ChattingItemProps {
  shareDeal: InferArray<FindShareDealQuery["shareDeals"]["items"]>;
}

const ChattingItem = ({
  shareDeal: {
    category,
    currentParticipants,
    coordinate,
    id,
    maxParticipants,
    orderPrice,
    status,
    thumbnail,
    title,
    isParticipant,
  },
}: ChattingItemProps) => {
  const isClose = status === ShareDealStatus.Close;
  const distance = useDistance(coordinate);

  return (
    <Box as="li" key={id}>
      <Link
        legacyBehavior
        href={{
          pathname: isParticipant ? "/chat/[id]" : "/chat/[id]/join",
          query: { id, title },
        }}
      >
        <Box
          align="center"
          as="a"
          cursor="pointer"
          direction="row"
          justify="space-between"
        >
          <Box align="center" direction="row" gap="16">
            <Avatar size="48" src={thumbnail} />
            <Box as="span">
              <Typography fontSize="body1-b">{title}</Typography>
              <Typography color="black4" fontSize="caption1-m">
                {category}・배달비 {orderPrice.toLocaleString()}원・거리
                {` ${!distance ? "계산중" : `${distance}km`}`}
              </Typography>
            </Box>
          </Box>
          <Label color={isClose ? "gray" : "orange"}>
            {isClose
              ? "마감"
              : `${currentParticipants}명 / ${maxParticipants}명`}
          </Label>
        </Box>
      </Link>
    </Box>
  );
};

export default memo(ChattingItem);
