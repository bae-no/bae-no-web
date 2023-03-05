import { RecentSearch } from "src/modules/search/RecentlySearch";
import { SearchLayout } from "src/modules/search/SearchLayout";
import { Header } from "src/ui/Layout";

const SearchRecent = () => (
  <SearchLayout leftNode={<Header.Back />}>
    <RecentSearch />
  </SearchLayout>
);

export default SearchRecent;
