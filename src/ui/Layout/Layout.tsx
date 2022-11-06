import { ReactElement } from "react";

import { Box } from "../Box";

import { BottomTab } from "./BottomTab";
import { Header } from "./Header";
import { HeaderProps } from "./Header/Header";

interface LayoutProps {
  children: ReactElement;
  headerProps?: HeaderProps;
  showBottomTab?: boolean;
}

const Layout = ({ children, showBottomTab, headerProps }: LayoutProps) => (
  <>
    <Header {...headerProps} />
    <Box as="main" height="full">
      {children}
    </Box>
    {showBottomTab && <BottomTab />}
  </>
);

export default Layout;
