import { useEffect } from "react";

import { useRouter } from "next/router";

import { IntersectionArea } from "src/components/IntersectionArea";
import {
  GetChatDetail,
  SubscriptionChatDocument,
  useInfiniteGetChatDetail,
} from "src/graphql";
import { useSubscriptionChat } from "src/hooks/useSubscriptionChat";
import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";
import { formatDate } from "src/utils/date";

import { ChatItem } from "./ChatItem";

interface DateChipProps {
  date?: string;
}

const dateFilter = (
  before?: GetChatDetail["chatDetail"][number],
  after?: GetChatDetail["chatDetail"][number],
) => {
  const formattingBeforeDate = Number(
    formatDate(before?.createdAt, "yyyyMMdd"),
  );
  const formattingAfterDate = Number(formatDate(after?.createdAt, "yyyyMMdd"));

  if (formattingBeforeDate > formattingAfterDate)
    return formatDate(before?.createdAt, "yyyy.MM.dd. Day of the week");
  return "";
};

const DateChip = ({ date }: DateChipProps) => {
  if (!date) return null;

  return (
    <Box bg="black9" br="48" px="12" py="4" width="fit">
      <Typography color="black2" fontSize="caption1-r">
        {date}
      </Typography>
    </Box>
  );
};

const PAGE_SIZE = 15;

export const ChatContent = () => {
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };

  const { data, hasNextPage, fetchNextPage } = useInfiniteGetChatDetail(
    "input",
    {
      input: {
        shareDealId: id,
        size: PAGE_SIZE,
      },
    },
    {
      enabled: !!id,
      getNextPageParam: (lastPage) => {
        if (lastPage.chatDetail.length === PAGE_SIZE) {
          return {
            cursor: lastPage.chatDetail[PAGE_SIZE - 1]?.orderedKey,
            shareDealId: id,
            size: PAGE_SIZE,
          };
        }
      },
      onSuccess: () => {
        const { documentElement } = document;
        const prevScrollHeight = documentElement.scrollHeight;
        requestAnimationFrame(() => {
          const newScrollHeight = documentElement.scrollHeight;
          documentElement.scrollTop += newScrollHeight - prevScrollHeight;
        });
      },
      refetchOnWindowFocus: false,
      suspense: true,
    },
  );

  const { data: subscriptionData } = useSubscriptionChat({
    query: SubscriptionChatDocument,
    variables: {
      shareDealId: id,
    },
  });

  useEffect(() => {
    const lastSubscriptionData =
      subscriptionData?.[Number(subscriptionData?.length) - 1];
    if (lastSubscriptionData?.writtenByMe || !lastSubscriptionData) {
      const { documentElement } = document;
      documentElement.scrollTop = documentElement.scrollHeight;
    }
  }, [subscriptionData]);

  const handleFetchMore: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box bg="black10" height="full">
      <Box flexDirection="column-reverse" gap="16">
        {subscriptionData
          ?.map((item, index) => {
            const [before, after] = [
              subscriptionData[index],
              subscriptionData[index + 1],
            ];
            const date = dateFilter(before, after);

            return (
              <Box alignItems="center" key={item.id} px="16">
                <DateChip date={date} />
                <ChatItem {...item} />
              </Box>
            );
          })
          .reverse()}
        {data?.pages.map((page, index) => (
          <Box
            flexDirection="column-reverse"
            gap="16"
            key={index.toFixed()}
            px="16"
          >
            {page.chatDetail.map((item, pageIndex) => {
              const [before, after] = [
                page.chatDetail[pageIndex],
                page.chatDetail[pageIndex + 1],
              ];
              const date = dateFilter(before, after);

              return (
                <Box alignItems="center" key={item.id}>
                  <DateChip date={date} />
                  <ChatItem {...item} />
                </Box>
              );
            })}
          </Box>
        ))}
        <IntersectionArea onIntersect={handleFetchMore}>
          <div />
        </IntersectionArea>
      </Box>
    </Box>
  );
};
