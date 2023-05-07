import { useRouter } from "next/router";

import { useInfiniteGetShareDealList } from "src/graphql";
import { Box } from "src/ui/Box";

import ShareDealListBox from "./ShareDealListBox";

const PAGE_SIZE = 15;
const INIT_PAGE_NUMBER = 0;

const ShareDealList = () => {
  const router = useRouter();
  const { keyword } = router.query as { [key: string]: string };

  const { data, hasNextPage, fetchNextPage } = useInfiniteGetShareDealList(
    "input",
    {
      input: {
        keyword,
        page: INIT_PAGE_NUMBER,
        size: PAGE_SIZE,
      },
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.shareDeals.items.length === PAGE_SIZE)
          return { keyword, page: allPages.length, size: PAGE_SIZE };
      },
    },
  );

  return (
    <Box marginTop="32" width="full">
      <ShareDealListBox
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </Box>
  );
};

export default ShareDealList;
