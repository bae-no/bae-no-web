import { useReastorageValue, useSetReastorage } from "@reastorage/react";

import { recentlySearch } from "src/store/recentlySearch";
import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import { NoRecentSearchContent } from "../SVGModules/NoRecentSearchContent";

import { RecentlyList } from "./RecentlyList";

const RecentlyTitleAndAllRemove = () => {
  const setRecentSearchList = useSetReastorage(recentlySearch);
  const handleResetList = () => {
    setRecentSearchList([]);
  };

  return (
    <Box alignItems="center" flexDirection="row" justifyContent="space-between">
      <Typography as="strong" fontSize="headline5">
        최근검색어
      </Typography>
      <Box cursor="pointer" onClick={handleResetList}>
        <Typography color="black4" fontSize="caption1-m">
          모두 지우기
        </Typography>
      </Box>
    </Box>
  );
};

const RecentSearchContent = () => (
  <Box gap="16" marginTop="20" width="full">
    <RecentlyTitleAndAllRemove />
    <RecentlyList />
  </Box>
);

export const RecentSearch = () => {
  const recentSearchList = useReastorageValue(recentlySearch);

  return recentSearchList.length ? (
    <RecentSearchContent />
  ) : (
    <NoRecentSearchContent />
  );
};
