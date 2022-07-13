import { Trigger } from "@radix-ui/react-tabs";

import { Typography } from "src/ui";

import { typographyCss } from "../Tab.css";

import { TabProp } from "./TabType";

export const TabLabel = ({ children, value }: TabProp) => (
  <Trigger asChild value={value}>
    <Typography className={typographyCss} fontSize="body2-m">
      {children}
    </Typography>
  </Trigger>
);
