import { Content } from "@radix-ui/react-tabs";

import { TabProp } from "./TabType";

export const TabContent = ({ children, value }: TabProp) => (
  <Content value={value}>{children}</Content>
);
