import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import ChattingListSkeleton from "src/modules/Chat/ChattingList/ChattingListSkeleton";
import { SearchLayout } from "src/modules/search/SearchLayout";
import ShareDealList from "src/modules/search/ShareDealList";
import { Box } from "src/ui/Box";
import { Header } from "src/ui/Layout";

const ShareDealSkeleton = () => (
  <Box width="full">
    <ChattingListSkeleton />
    <ChattingListSkeleton />
    <ChattingListSkeleton />
  </Box>
);

const SearchDetail = () => (
  <SearchLayout
    leftNode={
      <Box paddingRight="8">
        <Header.Back />
      </Box>
    }
  >
    <SSRSafeSuspense fallback={<ShareDealSkeleton />}>
      <ShareDealList />
    </SSRSafeSuspense>
  </SearchLayout>
);

export default SearchDetail;
