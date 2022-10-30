import { useCallback } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { useToggle } from "src/hooks/useToggle";
import ChattingList from "src/modules/Chat/ChattingList";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Header, Layout } from "src/ui/Layout";
import { Popup } from "src/ui/Popup";
import { Typography } from "src/ui/Typography";

let MOCK_CHATTINGS = [
  {
    avatarSrc: "a",
    chattingId: "2",
    date: "2022.04.12",
    ended: false,
    lastChat: "마지막 대화내용이 ..... 내용",
    notReadMessage: 9,
    title: "나는 피자가 좋다",
  },
  {
    avatarSrc: "a",
    chattingId: "1",
    date: "2022.04.12",
    ended: false,
    lastChat: "마지막 대화내용이 ..... 내용",
    notReadMessage: 10,
    title: "나는 치킨이 좋다",
  },
  {
    avatarSrc: "a",
    chattingId: "3",
    date: "2022.04.12",
    ended: false,
    lastChat: "마지막 대화내용이 ..... 내용",
    notReadMessage: 51,
    title: "나는 햄버거가 좋다",
  },
  {
    avatarSrc: "a",
    chattingId: "5",
    date: "2022.04.12",
    ended: false,
    lastChat: "마지막 대화내용이 ..... 내용",
    notReadMessage: 99,
    title: "나는 보쌈이 좋다",
  },
  {
    avatarSrc: "a",
    chattingId: "6",
    date: "2022.04.12",
    ended: false,
    lastChat: "마지막 대화내용이 ..... 내용",
    notReadMessage: 103,
    title: "나는 감자이 좋다",
  },
];

const MOCK_CHATTINGS_END = [
  {
    avatarSrc: "a",
    chattingId: "2",
    date: "2022.04.12",
    ended: true,
    lastChat: "마지막 대화내용이 ..... 내용",
    notReadMessage: 10,
    title: "나는 피자가 좋다",
  },
  {
    avatarSrc: "a",
    chattingId: "1",
    date: "2022.04.12",
    ended: true,
    lastChat: "마지막 대화내용이 ..... 내용",
    notReadMessage: 10,
    title: "나는 치킨이 좋다",
  },
];

const Chat = () => {
  const methods = useForm();
  const [deleteMode, toggleDelete, setDeleteMode] = useToggle();
  const [deleteModal, toggleDeleteModal] = useToggle();

  const onSubmit = useCallback(() => {
    toggleDeleteModal();
  }, [toggleDeleteModal]);
  const onCancel = useCallback(() => {
    toggleDeleteModal();
    methods.reset();
  }, [methods, toggleDeleteModal]);
  const onConfirm = useCallback(() => {
    toggleDeleteModal();
    setDeleteMode(false);

    Object.entries(methods.watch()).map((x) => {
      if (x[1]) {
        MOCK_CHATTINGS = MOCK_CHATTINGS.filter((y) => y.chattingId !== x[0]);
        return x;
      }
      return x;
    });

    methods.reset();
  }, [methods, toggleDeleteModal, setDeleteMode]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Layout
          headerProps={{
            rightNode: (
              <Header.Delete visible={deleteMode} onClick={toggleDelete} />
            ),
            title: "채팅",
          }}
          showBottomTab={!deleteMode}
        >
          <Box gap="24" px="16">
            <Button color="gray">공유딜 이용 가이드 보기</Button>
            <Typography as="h3" fontSize="body1-b">
              진행중인 딜
            </Typography>
            <ChattingList
              chattings={MOCK_CHATTINGS}
              checkbox={deleteMode}
              fetchMore={() => {
                // TODO: 추가 로드 기능 구현
              }}
              type="roomList"
            />
            <Typography as="h3" fontSize="body1-b">
              완료된 딜
            </Typography>
            <ChattingList
              chattings={MOCK_CHATTINGS_END}
              checkbox={deleteMode}
              fetchMore={() => {
                // TODO: 추가 로드 기능 구현
              }}
              type="roomList"
            />
            {deleteMode && <Button>나가기</Button>}
          </Box>
        </Layout>
        <Popup
          cancelText="취소"
          confirmText="나가기"
          description="채팅방에서 나가실건가요? 나가게되면 대화내용이 모두 삭제되고 채팅목록에서도 삭제됩니다."
          open={deleteModal}
          title="채딩방 나가기"
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </form>
    </FormProvider>
  );
};

export default Chat;
