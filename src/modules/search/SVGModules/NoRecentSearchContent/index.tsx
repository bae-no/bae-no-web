import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import NoRecentSearchSvg from "./no-recent-search.svg";
import { iconMarginBottom128 } from "./noRecentSearch.css";

export const NoRecentSearchContent = () => (
  <Box
    alignItems="center"
    className={iconMarginBottom128}
    gap="16"
    height="full"
    justifyContent="center"
  >
    <NoRecentSearchSvg />
    <Typography color="black2" fontSize="body1-m">
      최근 검색한 기록이 없습니다.
    </Typography>
  </Box>
);
