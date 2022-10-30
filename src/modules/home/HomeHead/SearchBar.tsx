import Link from "next/link";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";

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
