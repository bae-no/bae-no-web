import { ReactElement } from "react";

import { Box } from "src/ui/Box";
import { Header, Layout } from "src/ui/Layout";

import { SearchHeader } from "./SearchHeader";

interface SearchLayoutProps {
  children: ReactElement;
  showBottomTab?: boolean;
}

export const SearchLayout = ({
  children,
  showBottomTab,
}: SearchLayoutProps) => (
  <Layout
    headerProps={{
      leftNode: <Header.Back />,
      mainNode: (
        <Box paddingLeft="48" paddingRight="16" width="full">
          <SearchHeader />
        </Box>
      ),
    }}
    showBottomTab={showBottomTab}
  >
    <Box px="16">{children}</Box>
  </Layout>
);
