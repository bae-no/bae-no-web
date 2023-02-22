import { ReactNode } from "react";

import { Box } from "src/ui/Box";

import { SearchHeader } from "./SearchHeader";

interface SearchLayoutProps {
  children: ReactNode;
}

export const SearchLayout = ({ children }: SearchLayoutProps) => (
  <Box alignItems="center" height="full" marginTop="8" px="16">
    <SearchHeader />
    {children}
  </Box>
);
