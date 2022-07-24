import { cloneElement, ReactElement } from "react";

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
    {cloneElement(children, { as: "main" })}
    {showBottomTab && <BottomTab />}
  </>
);

export default Layout;
