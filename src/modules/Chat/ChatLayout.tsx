import { Dispatch, ReactElement, SetStateAction, useCallback } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { ConditionalRender } from "src/components/ConditionalRender";
import { Box } from "src/ui/Box";
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

interface ChatLayoutProps {
  children: ReactElement;
  deleteModal: boolean;
  deleteMode: boolean;
  setDeleteMode: Dispatch<SetStateAction<boolean>>;
  toggleDelete: () => void;
  toggleDeleteModal: () => void;
}

export const ChatLayout = ({
  children,
  toggleDeleteModal,
  setDeleteMode,
  deleteMode,
  deleteModal,
  toggleDelete,
}: ChatLayoutProps) => {
  const methods = useForm();

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
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Layout
            headerProps={{
              rightNode: (
                <ConditionalRender
                  condition={deleteMode}
                  renderCase={{
                    false: <Header.Delete onClick={toggleDelete} />,
                    true: (
                      <Box as="button" type="button" onClick={toggleDelete}>
                        <Typography color="black2" fontSize="body2-m">
                          선택해제
                        </Typography>
                      </Box>
                    ),
                  }}
                />
              ),
              title: "채팅",
            }}
            showBottomTab={!deleteMode}
          >
            {children}
          </Layout>
        </form>
      </FormProvider>
      <Box marginBottom="48">
        <Popup
          cancelText="취소"
          confirmText="나가기"
          description="채팅방에서 나가실건가요? 나가게되면 대화내용이 모두 삭제되고 채팅목록에서도 삭제됩니다."
          open={deleteModal}
          title="채딩방 나가기"
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </Box>
    </>
  );
};
