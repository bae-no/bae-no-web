import { useContext } from "react";

import { useRouter } from "next/router";

import { useStartShareDeal } from "src/graphql";
import { Button } from "src/ui/Button";

import { MenuLayoutContext } from "../MenuLayout";

import { UpdateDealStatus } from "./UpdateDealStatus";
import { UpdateModal } from "./UpdateModal";

export const StartDeal = ({ isActive }: { isActive?: boolean }) => {
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };
  const { setOpen } = useContext(MenuLayoutContext);
  const { mutate } = useStartShareDeal({
    onSuccess: () => setOpen(false),
  });

  const handleStart = () => {
    if (!isActive || !id) return;
    mutate({
      input: {
        shareDealId: id,
      },
    });
  };

  return (
    <UpdateModal
      confirmBtn={<Button onClick={handleStart}>시작하기</Button>}
      description={`모든 인원이 시작에 동의했나요? 
    시작 처리는 딱 한 번만 설정 가능하고, 
    종료하기 전까지는 나갈 수 없어요.`}
      isActive={isActive}
      title="공유딜 시작하기"
    >
      <UpdateDealStatus isActive={isActive}>공유딜 시작하기</UpdateDealStatus>
    </UpdateModal>
  );
};
