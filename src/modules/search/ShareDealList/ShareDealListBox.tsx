import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import List from "src/components/List";
import { FindShareDealQuery, GetShareDealList } from "src/graphql";
import ChattingItem from "src/modules/Chat/ChattingList/ChattingItem";
import { Box } from "src/ui/Box";

import { NoShareDeal } from "../SVGModules/NoShareDeal";

interface ShareDealListBoxProps {
  data: InfiniteData<GetShareDealList> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<GetShareDealList, unknown>>;
  hasNextPage?: boolean;
}

const ShareDealListBox = ({
  hasNextPage,
  fetchNextPage,
  data,
}: ShareDealListBoxProps) => (
  <Box>
    {data?.pages[0].shareDeals.total ? (
      <List
        as="ul"
        css={{
          gap: "16",
          width: "full",
        }}
        fetchMore={() => {
          if (!hasNextPage) return;
          fetchNextPage();
        }}
        list={data?.pages as FindShareDealQuery[]}
        renderItem={(page) =>
          page.shareDeals.items.map((shareDeal) => (
            <ChattingItem key={shareDeal.id} shareDeal={shareDeal} />
          ))
        }
      />
    ) : (
      <NoShareDeal />
    )}
  </Box>
);

export default ShareDealListBox;
