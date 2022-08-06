import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useToggle } from "src/hooks";
import ChattingList from "src/modules/Chat/ChattingList";
import { map, remove } from "lodash";
import { Box, Button, Header, Layout, Popup, Typography } from "src/ui";

const MOCK_CHATTINGS = [
  {
    avatarSrc: "a",
    chattingId: "2",
    ended: false,
    title: "나는 피자가 좋다",
    lastChat: "마지막 대화내용이 ..... 내용",
    date: "2022.04.12",
    notReadMessage: 9,
  },
  {
    avatarSrc: "a",
    chattingId: "1",
    ended: false,
    title: "나는 치킨이 좋다",
    lastChat: "마지막 대화내용이 ..... 내용",
    date: "2022.04.12",
    notReadMessage: 10,
  },
  {
    avatarSrc: "a",
    chattingId: "3",
    ended: false,
    title: "나는 햄버거가 좋다",
    lastChat: "마지막 대화내용이 ..... 내용",
    date: "2022.04.12",
    notReadMessage: 51,
  },
  {
    avatarSrc: "a",
    chattingId: "5",
    ended: false,
    title: "나는 보쌈이 좋다",
    lastChat: "마지막 대화내용이 ..... 내용",
    date: "2022.04.12",
    notReadMessage: 99,
  },
  {
    avatarSrc: "a",
    chattingId: "6",
    ended: false,
    title: "나는 감자이 좋다",
    lastChat: "마지막 대화내용이 ..... 내용",
    date: "2022.04.12",
    notReadMessage: 103,
  },
];

const MOCK_CHATTINGS_END = [
  {
    avatarSrc: "a",
    chattingId: "2",
    ended: true,
    title: "나는 피자가 좋다",
    lastChat: "마지막 대화내용이 ..... 내용",
    date: "2022.04.12",
    notReadMessage: 10,
  },
  {
    avatarSrc: "a",
    chattingId: "1",
    ended: true,
    title: "나는 치킨이 좋다",
    lastChat: "마지막 대화내용이 ..... 내용",
    date: "2022.04.12",
    notReadMessage: 10,
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
    map(
      methods.watch(),
      (value, key) => value && remove(MOCK_CHATTINGS, { chattingId: key }),
    );
    methods.reset();
  }, [methods, toggleDeleteModal]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Layout
          showBottomTab={!deleteMode}
          headerProps={{
            rightNode: (
              <Header.Delete visible={deleteMode} onClick={toggleDelete} />
            ),
            title: "채팅",
          }}
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
            />
            {deleteMode && <Button>나가기</Button>}
          </Box>
        </Layout>
        <Popup
          cancelText="취소"
          confirmText="나가기"
          description="채팅방에서 나가실건가요? 나가게되면 대화내용이 모두 삭제되고 채팅목록에서도 삭제됩니다."
          onConfirm={onConfirm}
          onCancel={onCancel}
          title="채딩방 나가기"
          open={deleteModal}
        >
          <></>
        </Popup>
      </form>
    </FormProvider>
  );
};

export default Chat;
