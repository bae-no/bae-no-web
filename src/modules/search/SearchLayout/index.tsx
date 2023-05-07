import { ReactElement, ReactNode } from "react";

import { Box } from "src/ui/Box";
import { BottomTab, Layout } from "src/ui/Layout";

import { SearchHeader } from "./SearchHeader";

interface SearchLayoutProps {
  children: ReactElement;
  leftNode?: ReactNode;
}

export const SearchLayout = ({ children, leftNode }: SearchLayoutProps) => (
  <Layout
    footer={<BottomTab />}
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
  >
    <Box px="16">{children}</Box>
  </Layout>
);
