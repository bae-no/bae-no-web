import { Box } from "src/ui/Box";
import { Skeleton } from "src/ui/Skeleton";

const ChattingItemSkeleton = () => (
  <Box align="center" as="li" direction="row" justify="space-between">
    <Box align="center" direction="row" gap="16">
      <Skeleton borderRadius="half" size="48" />
      <Box gap="8">
        <Skeleton height="20" width="128" />
        <Skeleton height="12" width="128" />
      </Box>
    </Box>
    <Skeleton height="24" width="64" />
  </Box>
);

const ChattingListSkeleton = () => (
  <Box as="ul" gap="16">
    <ChattingItemSkeleton />
    <ChattingItemSkeleton />
    <ChattingItemSkeleton />
    <ChattingItemSkeleton />
    <ChattingItemSkeleton />
  </Box>
);

export default ChattingListSkeleton;
