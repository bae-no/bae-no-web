import { ElementType, ReactElement } from "react";

import { Box } from "../Box";

import { Header } from "./Header";
import { HeaderProps } from "./Header/Header";

interface LayoutProps {
  as?: ElementType;
  children: ReactElement;
  footer?: ReactElement;
  headerProps?: HeaderProps;
}

const Layout = ({
  children,
  as = "main",
  headerProps,
  footer,
}: LayoutProps) => (
  <Box height="full">
    <Header {...headerProps} />
    <Box as={as} height="full">
      {children}
    </Box>
    {footer}
  </Box>
);

export default Layout;
