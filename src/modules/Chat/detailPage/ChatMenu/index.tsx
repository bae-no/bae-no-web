import { useRouter } from "next/router";

import { useChatStatus } from "src/graphql";
import { Box } from "src/ui/Box";

import { Divider } from "./Divider";
import { ChatMenuLayout } from "./MenuLayout";
import { Participants } from "./Participants";
import { SettingDeal } from "./SettingDeal";
import { EndDeal } from "./UpdateDealStatus/EndDeal";
import { StartDeal } from "./UpdateDealStatus/StartDeal";

export const ChatMeun = () => {
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };
  const { data } = useChatStatus(
    {
      input: {
        shareDealId: id,
      },
    },
    {
      enabled: router.isReady,
    },
  );

  return (
    <ChatMenuLayout>
      <Box py="24">
        <SettingDeal />
        <StartDeal isActive={data?.shareDealStatus.canStart} />
        <EndDeal isActive={data?.shareDealStatus.canEnd} />
      </Box>
      <Divider />
      <Participants participants={data?.shareDealStatus.participants} />
      <Box bottom="0" position="absolute">
        밑에것들
      </Box>
    </ChatMenuLayout>
  );
};
