import { useDeferredValue, useState } from "react";

import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import List from "src/components/List";
import {
  FindShareDealQuery,
  FoodCategory,
  ShareDealSortType,
  useInfiniteFindShareDealQuery,
  useHomeStaticQuery,
} from "src/graphql";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import { Select } from "src/ui/Select";
import { Skeleton } from "src/ui/Skeleton";
import { Tab } from "src/ui/Tab";
import { Typography } from "src/ui/Typography";

import ChattingItem from "../Chat/ChattingList/ChattingItem";
import ChattingListSkeleton from "../Chat/ChattingList/ChattingListSkeleton";

interface ShareDealListProps {
  category?: FoodCategory | "";
  onSortChange: (value: string) => void;
  sortList?: Array<{ code: ShareDealSortType; name: string }>;
  sortType?: ShareDealSortType;
}

const PAGE_SIZE = 10;

export const ShareDealList = ({
  category,
  sortType,
  onSortChange,
  sortList,
}: ShareDealListProps) => {
  const deferredSort = useDeferredValue(sortType);
  const queryInput = {
    category: category || undefined,
    page: 0,
    size: PAGE_SIZE,
    sortType: deferredSort,
  };
  const { data, hasNextPage, fetchNextPage } = useInfiniteFindShareDealQuery(
    "input",
    {
      input: queryInput,
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.shareDeals.items.length === PAGE_SIZE) {
          return { ...queryInput, page: allPages.length };
        }
      },
    },
  );

  return (
    <>
      <Box>
        <Box direction="row" justify="space-between">
          <Typography as="span" fontSize="body1-b">
            총{" "}
            <Typography as="strong" color="orange2" fontSize="body1-b">
              0
            </Typography>
            개의 공유딜
          </Typography>
          <Select
            options={(sortList || []).map(({ name, code }) => ({
              label: name,
              value: code,
            }))}
            placeholder=""
            size="small"
            value={sortType}
            onValueChange={onSortChange}
          />
        </Box>
      </Box>
      <List
        as="ul"
        css={{
          gap: "16",
        }}
        fetchMore={() => {
          if (!hasNextPage) return;
          fetchNextPage();
        }}
        list={data?.pages as FindShareDealQuery[]}
        renderItem={(page) =>
          page.shareDeals?.items.map((shareDeal) => (
            <ChattingItem key={shareDeal.id} shareDeal={shareDeal} />
          ))
        }
      />
    </>
  );
};

const ChattingRooms = () => {
  const { data } = useHomeStaticQuery(undefined, { staleTime: 5000 });
  const { foodCatalog, shareDealSort } = data?.categories || {};
  const [category, setCategory] = useState<FoodCategory | "">("");
  const handleCategoryChange = (value: string) =>
    setCategory(value as FoodCategory);

  const [sort, setSort] = useState(shareDealSort?.[0].code);
  const handleSortChange = (value: string) =>
    setSort(value as ShareDealSortType);

  return (
    <Container gap="24">
      <Box gap="16">
        <Tab
          defaultValue={category}
          options={(foodCatalog
            ? [{ code: "", name: "전체" }, ...foodCatalog]
            : []
          ).map(({ name, code }) => ({
            label: name,
            value: code,
          }))}
          onValueChange={handleCategoryChange}
        />
      </Box>
      <SSRSafeSuspense
        fallback={
          <Box gap="24">
            <Box direction="row" justify="space-between">
              <Skeleton height="24" width="128" />
              <Skeleton height="24" width="64" />
            </Box>
            <ChattingListSkeleton />
          </Box>
        }
      >
        <ShareDealList
          category={category}
          sortList={shareDealSort}
          sortType={sort}
          onSortChange={handleSortChange}
        />
      </SSRSafeSuspense>
    </Container>
  );
};

export default ChattingRooms;
