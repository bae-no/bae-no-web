import { List } from "@radix-ui/react-tabs";

import { tabListCss } from "../Tab.css";

import { TabProp } from "./TabType";

type TabListProp = Pick<TabProp, "children">;

export const TabList = ({ children }: TabListProp) => (
  <List className={tabListCss}>{children}</List>
);
