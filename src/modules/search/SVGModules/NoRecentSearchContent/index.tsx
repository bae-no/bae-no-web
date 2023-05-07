import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import NoRecentSearchSvg from "./no-recent-search.svg";

export const NoRecentSearchContent = () => (
  <Box
    alignItems="center"
    gap="16"
    left="half"
    position="absolute"
    top="half"
    transform="halfMinus"
  >
    <NoRecentSearchSvg />
    <Typography color="black2" fontSize="body1-m">
      최근 검색한 기록이 없습니다.
    </Typography>
  </Box>
);
