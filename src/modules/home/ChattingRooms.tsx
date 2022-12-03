import { useState } from "react";

import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import List from "src/components/List";
import {
  FoodCategory,
  ShareDealSortType,
  useHomeStaticQuery,
} from "src/graphql";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import { Select } from "src/ui/Select";
import { Tab } from "src/ui/Tab";
import { Typography } from "src/ui/Typography";

import ChattingItem from "../Chat/ChattingList/ChattingItem";
import ChattingListSkeleton from "../Chat/ChattingList/ChattingListSkeleton";

const MOCK_CHATTINGS = [
  {
    avatarSrc: "a",
    category: "피자",
    chattingId: "2",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 피자가 좋다",
  },
  {
    avatarSrc: "a",
    category: "치킨",
    chattingId: "1",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 치킨이 좋다",
  },
  {
    avatarSrc: "a",
    category: "햄버거",
    chattingId: "3",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 햄버거가 좋다",
  },
  {
    avatarSrc: "a",
    category: "보쌈",
    chattingId: "5",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 보쌈이 좋다",
  },
  {
    avatarSrc: "a",
    category: "감자",
    chattingId: "6",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 감자이 좋다",
  },
  {
    avatarSrc: "a",
    category: "감자",
    chattingId: "7",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 감자이 좋다",
  },
  {
    avatarSrc: "a",
    category: "감자",
    chattingId: "8",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 감자이 좋다",
  },
  {
    avatarSrc: "a",
    category: "감자",
    chattingId: "9",
    currentAttendee: 1,
    deliveryFee: 10000,
    distance: 1,
    ended: false,
    maxAttendee: 10,
    title: "나는 감자이 좋다",
  },
];

const ChattingRooms = () => {
  const { data } = useHomeStaticQuery();
  const { foodCatalog, shareDealSort } = data?.categories || {};
  const [category, setCategory] = useState(foodCatalog?.[0].code);
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
          options={(foodCatalog || []).map(({ name, code }) => ({
            label: name,
            value: code,
          }))}
          onValueChange={handleCategoryChange}
        />
      </Box>
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
            options={(shareDealSort || []).map(({ name, code }) => ({
              label: name,
              value: code,
            }))}
            placeholder=""
            size="small"
            value={sort}
            onValueChange={handleSortChange}
          />
        </Box>
      </Box>
      <SSRSafeSuspense fallback={<ChattingListSkeleton />}>
        <List
          as="ol"
          css={{ gap: "16" }}
          fetchMore={() => {
            // TODO: 추가 로드 기능 구현
          }}
          list={MOCK_CHATTINGS}
          renderItem={(chatting) => (
            <ChattingItem {...chatting} key={chatting.chattingId} />
          )}
        />
      </SSRSafeSuspense>
    </Container>
  );
};

export default ChattingRooms;
