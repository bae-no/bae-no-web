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
      mainNode: (
        <Box
          alignItems="center"
          flexDirection="row"
          gap="8"
          py="8"
          width="full"
        >
          {leftNode}
          <SearchHeader />
        </Box>
      ),
    }}
    showBottomTab={showBottomTab}
  >
    <Box px="16">{children}</Box>
  </Layout>
);
