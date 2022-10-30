import { ForwardedRef, forwardRef } from "react";

import { Box } from "src/ui/Box";

import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";

const HomeHead = (_: {}, ref: ForwardedRef<HTMLDivElement>) => (
  <Box gap="8" paddingTop="32" position="relative" ref={ref}>
    <Box backgroundColor="orange6" inset="0" position="absolute" zIndex={-1} />
    <UserInfo />
    <SearchBar />
  </Box>
);

export default forwardRef(HomeHead);
