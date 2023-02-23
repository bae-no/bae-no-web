import { SearchLayout } from "src/modules/search/SearchLayout";
import { MainSearchIcon } from "src/modules/search/SVGModules/MainSearchIcon";
import { Box } from "src/ui/Box";
import { Input } from "src/ui/Input";
import { Layout, Header } from "src/ui/Layout";

const Search = () => (
  <SearchLayout showBottomTab>
    <MainSearchIcon />
  </SearchLayout>
);

export default Search;
