import { useState } from "react";

import { RecentSearch } from "src/modules/search-detail/RecentlySearch";
import { SearchHeader } from "src/modules/search-detail/SearchHeader";
import { ShareDealList } from "src/modules/search-detail/ShareDealList";
import { Box } from "src/ui/Box";

const SearchDetail = () => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <Box alignItems="center" height="full" marginTop="8" px="16">
      <SearchHeader inputFocus={inputFocus} setInputFocus={setInputFocus} />
      {inputFocus ? <RecentSearch /> : <ShareDealList />}
    </Box>
  );
};

export default SearchDetail;
