import { ReactNode } from "react";

import { Root, TabsProps as RadixUiTabsProps } from "@radix-ui/react-tabs";

import { tabRootCss } from "../Tab.css";

export interface TabProps extends RadixUiTabsProps {
  children: ReactNode;
}

const Tab = ({ children, defaultValue, onValueChange }: TabProps) => (
  <Root
    className={tabRootCss}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    {children}
  </Root>
);

export default Tab;
