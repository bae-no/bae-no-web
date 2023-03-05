import { ReactElement, ReactNode } from "react";

import { Box } from "src/ui/Box";
import { Layout } from "src/ui/Layout";

import { SearchHeader } from "./SearchHeader";

interface SearchLayoutProps {
  children: ReactElement;
  leftNode?: ReactNode;
  showBottomTab?: boolean;
}

export const SearchLayout = ({
  children,
  showBottomTab,
  leftNode,
}: SearchLayoutProps) => (
  <Layout
    headerProps={{
      leftNode,
      mainNode: (
        <Box py="8" width="full">
          <SearchHeader />
        </Box>
      ),
    }}
    showBottomTab={showBottomTab}
  >
    <Box px="16">{children}</Box>
  </Layout>
);
