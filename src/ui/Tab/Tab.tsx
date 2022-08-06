import {
  List,
  Root,
  TabsProps as RadixUiTabsProps,
  Trigger,
} from "@radix-ui/react-tabs";

import { Typography } from "src/ui/Typography";

import { tabListCss, tabRootCss, typographyCss } from "./Tab.css";

export interface TabProps extends RadixUiTabsProps {
  options: { label: string; value: string }[];
}

const Tab = ({ options, onValueChange, defaultValue }: TabProps) => (
  <Root
    className={tabRootCss}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    <List className={tabListCss}>
      {options.map((option) => (
        <Trigger asChild key={option.value} value={option.value}>
          <Typography className={typographyCss} fontSize="body2-m">
            {option.label}
          </Typography>
        </Trigger>
      ))}
    </List>
  </Root>
);

export default Tab;
