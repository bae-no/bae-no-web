import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import { useToggle } from "src/hooks/useToggle";
import { ChatLayout } from "src/modules/Chat/ChatLayout";
import ChattingListSkeleton from "src/modules/Chat/ChattingList/ChattingListSkeleton";
import { CompletedShareDeal } from "src/modules/Chat/CompletedShareDeal";
import GuideModal from "src/modules/Chat/GuideModal";
import { ProgressShareDeal } from "src/modules/Chat/ProgressShareDeal";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";

const Chat = () => {
  const [deleteMode, toggleDelete, setDeleteMode] = useToggle();
  const [deleteModal, toggleDeleteModal] = useToggle();

  return (
    <ChatLayout
      deleteModal={deleteModal}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
      toggleDelete={toggleDelete}
      toggleDeleteModal={toggleDeleteModal}
    >
      <Box gap="24" px="16">
        <GuideModal
          trigger={<Button color="gray">공유딜 이용 가이드 보기</Button>}
        />
        <Typography as="h3" fontSize="body1-b">
          진행중인 딜
        </Typography>
        <SSRSafeSuspense fallback={<ChattingListSkeleton />}>
          <ProgressShareDeal deleteMode={deleteMode} />
        </SSRSafeSuspense>
        <Typography as="h3" fontSize="body1-b">
          완료된 딜
        </Typography>
        <SSRSafeSuspense fallback={<ChattingListSkeleton />}>
          <CompletedShareDeal deleteMode={deleteMode} />
        </SSRSafeSuspense>
        {deleteMode && (
          <Box bottom="48" position="sticky">
            <Button>나가기</Button>
          </Box>
        )}
      </Box>
    </ChatLayout>
  );
};

export default Chat;
