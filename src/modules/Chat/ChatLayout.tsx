import { Dispatch, ReactElement, SetStateAction, useCallback } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { ConditionalRender } from "src/components/ConditionalRender";
import { useLeaveChat } from "src/graphql";
import { Box } from "src/ui/Box";
import { BottomTab, Header, Layout } from "src/ui/Layout";
import { Popup } from "src/ui/Popup";
import { Typography } from "src/ui/Typography";
import { queryClient } from "src/utils/queryClient";

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
  const { mutate } = useLeaveChat({
    onSuccess: () => {
      queryClient.refetchQueries(["getChatList"]);
    },
  });

  const onSubmit = useCallback(
    (data: { [key: string]: boolean }) => {
      const isSelectDeal = Object.keys(data).length !== 0;
      if (!isSelectDeal) return;
      toggleDeleteModal();
    },
    [toggleDeleteModal],
  );

  const onCancel = useCallback(() => {
    toggleDeleteModal();
    methods.reset();
  }, [methods, toggleDeleteModal]);

  const onConfirm = useCallback(() => {
    toggleDeleteModal();
    setDeleteMode(false);
    Object.entries(methods.getValues()).forEach(([key, value]) => {
      if (!value) return;
      mutate({
        input: {
          shareDealId: key,
        },
      });
    });
    methods.reset();
  }, [methods, mutate, setDeleteMode, toggleDeleteModal]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Layout
            footer={!deleteMode ? <BottomTab /> : undefined}
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
          >
            {children}
          </Layout>
        </form>
      </FormProvider>
      <Popup
        cancelText="취소"
        confirmText="나가기"
        description="채팅방에서 나가실건가요? 나가게되면 대화내용이 모두 삭제되고 채팅목록에서도 삭제됩니다."
        open={deleteModal}
        title="채딩방 나가기"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
};
