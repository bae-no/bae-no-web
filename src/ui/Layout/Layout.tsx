import { ElementType, ReactElement } from "react";

import { Box } from "../Box";

import { BottomTab } from "./BottomTab";
import { Header } from "./Header";
import { HeaderProps } from "./Header/Header";

interface LayoutProps {
  as?: ElementType;
  children: ReactElement;
  headerProps?: HeaderProps;
  showBottomTab?: boolean;
}

const Layout = ({
  children,
  showBottomTab,
  as = "main",
  headerProps,
}: LayoutProps) => (
  <Box height="full">
    <Header {...headerProps} />
    <Box as={as} height="full">
      {children}
    </Box>
    {showBottomTab && <BottomTab />}
  </Box>
);

export default Layout;
