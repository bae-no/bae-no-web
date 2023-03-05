import { RecentSearch } from "src/modules/search/RecentlySearch";
import { SearchLayout } from "src/modules/search/SearchLayout";
import { Box } from "src/ui/Box";
import { Header } from "src/ui/Layout";

const SearchRecent = () => (
  <SearchLayout
    leftNode={
      <Box paddingRight="8">
        <Header.Back />
      </Box>
    }
  >
    <RecentSearch />
  </SearchLayout>
);

export default SearchRecent;
