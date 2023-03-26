import { useRouter } from "next/router";

import { useChatStatus } from "src/graphql";
import { Box } from "src/ui/Box";

import { ChatMenuFooter } from "./ChatMenuFooter";
import { Divider } from "./Divider";
import { GuideTrigger } from "./GuideModalTrigger";
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
      <GuideTrigger />
      <Divider />
      {data?.shareDealStatus.isOwner && (
        <>
          <Box py="24">
            <SettingDeal />
            <StartDeal isActive={data?.shareDealStatus.canStart} />
            <EndDeal isActive={data?.shareDealStatus.canEnd} />
          </Box>
          <Divider />
        </>
      )}
      <Participants participants={data?.shareDealStatus.participants} />
      <Box bottom="0" left="0" position="absolute" width="full">
        <Divider />
        <ChatMenuFooter shareDealStatus={data?.shareDealStatus} />
      </Box>
    </ChatMenuLayout>
  );
};
