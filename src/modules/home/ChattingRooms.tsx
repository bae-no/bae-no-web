import { useState } from "react";

import List from "src/components/List";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import { Select } from "src/ui/Select";
import { Tab } from "src/ui/Tab";
import { Typography } from "src/ui/Typography";

import ChattingItem from "../Chat/ChattingList/ChattingItem";

const MOCK_CATEGORIES = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "카테고리1",
    value: "category1",
  },
  {
    label: "카테고리2",
    value: "category2",
  },
  {
    label: "카테고리3",
    value: "category3",
  },
  {
    label: "카테고리4",
    value: "category4",
  },
  {
    label: "카테고리5",
    value: "category5",
  },
  {
    label: "카테고리6",
    value: "category6",
  },
  {
    label: "카테고리7",
    value: "category7",
  },
];

const SORT_OPTIONS = [
  {
    label: "등록순",
    value: "CREATED_ASC",
  },
  { label: "인기순", value: "POPULAR_ASC" },
];

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
  const [category, setCategory] = useState(MOCK_CATEGORIES[0].value);
  const handleCategoryChange = (value: string) => setCategory(value);

  const [sort, setSort] = useState(SORT_OPTIONS[0].value);
  const handleSortChange = (value: string) => setSort(value);

  return (
    <Container gap="24">
      <Box gap="16">
        <Tab
          defaultValue={category}
          options={MOCK_CATEGORIES}
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
            options={SORT_OPTIONS}
            placeholder=""
            size="small"
            value={sort}
            onValueChange={handleSortChange}
          />
        </Box>
      </Box>
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
    </Container>
  );
};

export default ChattingRooms;
