import Link from "next/link";

import { Box, Icon, Input } from "src/ui";

const SearchBar = () => (
  <Box
    as={Link}
    href="search-detail"
    position="relative"
    px="16"
    transform="yHalfPlus"
  >
    <Input
      leftNode={<Icon name="icon_search" />}
      placeholder="공유할 배달음식을 찾아보세요."
    />
  </Box>
);

export default SearchBar;
