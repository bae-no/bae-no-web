import { Box } from "src/ui/Box";
import { Skeleton } from "src/ui/Skeleton";

interface ChatItemSkeletonProps {
  float?: "left" | "right";
}

const ChatItemSkeleton = ({ float = "left" }: ChatItemSkeletonProps) => (
  <Box
    alignItems="flex-end"
    flexDirection={float === "right" ? "row-reverse" : "row"}
    gap="8"
  >
    <Skeleton borderRadius="half" height="36" width="36" />
    <Skeleton borderRadius="24" height="40" width="128" />
    <Skeleton height="12" width="64" />
  </Box>
);

export const ChatSkeleton = () => (
  <Box bg="black10" gap="16" height="full" px="16">
    <ChatItemSkeleton float="right" />
    <ChatItemSkeleton />
    <ChatItemSkeleton float="right" />
    <ChatItemSkeleton />
    <ChatItemSkeleton />
    <ChatItemSkeleton float="right" />
    <ChatItemSkeleton />
  </Box>
);
