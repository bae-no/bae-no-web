import { memo } from "react";

import { useRouter } from "next/router";

import { FindShareDealQuery, ShareDealStatus } from "src/graphql";
import { InferArray } from "src/types";
import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";
import { getDistanceFromCoordinates } from "src/utils/getDistanceFromCoordinates";

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
  },
}: ChattingItemProps) => {
  const router = useRouter();
  const isClose = status === ShareDealStatus.Close;
  const distance = getDistanceFromCoordinates(coordinate, coordinate);
  const handleRouteJoinPage = () => {
    router.push({
      pathname: "/chat/join/[id]",
      query: { id },
    });
  };

  return (
    <Box
      align="center"
      as="li"
      cursor="pointer"
      direction="row"
      justify="space-between"
      key={id}
      onClick={handleRouteJoinPage}
    >
      <Box align="center" direction="row" gap="16">
        <Avatar size="48" src={thumbnail} />
        <Box as="span">
          <Typography fontSize="body1-b">{title}</Typography>
          <Typography color="black4" fontSize="caption1-m">
            {category}・배달비 {orderPrice.toLocaleString()}원・거리
            {` ${distance}`}
            km
          </Typography>
        </Box>
      </Box>
      <Label color={isClose ? "gray" : "orange"}>
        {isClose ? "마감" : `${currentParticipants}명 / ${maxParticipants}명`}
      </Label>
    </Box>
  );
};

export default memo(ChattingItem);
