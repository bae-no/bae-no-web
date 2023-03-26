import { ChatStatus } from "src/graphql";
import { Box } from "src/ui/Box";

import { Divider } from "../Divider";

import { LeaveChat } from "./LeaveChat";
import { SettingChat } from "./SettingChat";

interface ChatMenuFooterProps {
  shareDealStatus?: ChatStatus["shareDealStatus"];
}

export const ChatMenuFooter = ({ shareDealStatus }: ChatMenuFooterProps) => (
  <Box
    alignItems="center"
    flexDirection="row"
    justifyContent="space-around"
    py="12"
  >
    <SettingChat />
    <Divider height="12" position="absolute" />
    <LeaveChat shareDealStatus={shareDealStatus} />
  </Box>
);
