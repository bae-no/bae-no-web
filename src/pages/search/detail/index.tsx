import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import ChattingListSkeleton from "src/modules/Chat/ChattingList/ChattingListSkeleton";
import { SearchLayout } from "src/modules/search/SearchLayout";
import ShareDealList from "src/modules/search/ShareDealList";
import { Box } from "src/ui/Box";

const SearchDetail = () => (
  <SearchLayout>
    <SSRSafeSuspense
      fallback={
        <Box width="full">
          <ChattingListSkeleton />
          <ChattingListSkeleton />
          <ChattingListSkeleton />
        </Box>
      }
    >
      <ShareDealList />
    </SSRSafeSuspense>
  </SearchLayout>
);

export default SearchDetail;
