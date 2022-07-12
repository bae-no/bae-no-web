import { ReactNode } from "react";

import {
  Root,
  List,
  Trigger,
  Content,
  TabsProps as RadixUiTabsProps,
} from "@radix-ui/react-tabs";

import { Box } from "../Box";
import { Typography } from "../Typography";

import { tabRootCss, tabListCss, typographyCss } from "./Tab.css";

export interface TabProps extends RadixUiTabsProps {
  tab: {
    content: ReactNode | string;
    label: string;
    tabId: string;
  }[];
}

const Tab = ({ tab, defaultValue, onValueChange }: TabProps) => (
  <Root
    className={tabRootCss}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    <List className={tabListCss}>
      {tab.map(({ label, tabId }) => (
        <Box alignItems="center" flexDirection="column" gap="xs" key={tabId}>
          <Trigger asChild value={tabId}>
            <Typography className={typographyCss} fontSize="body2-m">
              {label}
            </Typography>
          </Trigger>
        </Box>
      ))}
    </List>
    {tab.map(({ content, tabId }) => (
      <Content key={tabId} value={tabId}>
        {content}
      </Content>
    ))}
  </Root>
);

export default Tab;
