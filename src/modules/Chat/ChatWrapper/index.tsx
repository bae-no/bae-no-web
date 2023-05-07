import { useState } from "react";

import { useRouter } from "next/router";

import { useChatStatus } from "src/graphql";
import { Popup } from "src/ui/Popup";

export const ChatWrapper = () => {
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };
  const { data } = useChatStatus({
    input: {
      shareDealId: id,
    },
  });
  const { shareDealStatus } = data || {};
  const { canEnd, canStart, isOwner } = shareDealStatus || {};
  const canChat = canEnd && !canStart;
  const [open, setOpen] = useState(!canChat);
  const handleConfirm = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Popup
      confirmText="확인"
      description={`인원이 과반수 이상 진입해야
채팅 입력이 가능해요.
조금만 기다려 주세요.`}
      open={open && !isOwner}
      title=""
      onConfirm={handleConfirm}
    />
  );
};
