import { useContext } from "react";

import { useRouter } from "next/router";

import { useEndShareDeal } from "src/graphql";
import { Button } from "src/ui/Button";

import { MenuLayoutContext } from "../MenuLayout";

import { UpdateDealStatus } from "./UpdateDealStatus";
import { UpdateModal } from "./UpdateModal";

export const EndDeal = ({ isActive }: { isActive?: boolean }) => {
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };
  const { setOpen } = useContext(MenuLayoutContext);
  const { mutate } = useEndShareDeal({
    onSuccess: () => {
      setOpen(false);
      router.push("/");
    },
  });

  const handleEnd = () => {
    if (!isActive || !id) return;
    mutate({
      input: {
        shareDealId: id,
      },
    });
  };

  return (
    <UpdateModal
      confirmBtn={<Button onClick={handleEnd}>종료하기</Button>}
      description={`배달비와 배달 음식을 다 잘 나누셨나요?
    종료 처리는 딱 한 번만 설정 가능하고, 
    종료 후에는 채팅을 입력할 수 없어요.`}
      isActive={isActive}
      title="공유딜 종료하기"
    >
      <UpdateDealStatus isActive={isActive}>공유딜 종료하기</UpdateDealStatus>
    </UpdateModal>
  );
};
