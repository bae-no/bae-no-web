import { FormProvider } from "react-hook-form";

import { ConditionalRender } from "src/components/ConditionalRender";
import List from "src/components/List";
import MetaTags from "src/components/MetaTags";
import { useToggle } from "src/hooks/useToggle";
import NotificationDeleteButton from "src/modules/notification/NotificationDeleteButton";
import NotificationEmpty from "src/modules/notification/NotificationEmpty";
import NotificationListItem from "src/modules/notification/NotificationListItem";
import { useNotificationDeleteForm } from "src/modules/notification/useNotificationForm";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";
import { Popup } from "src/ui/Popup";
import { Typography } from "src/ui/Typography";

const MOCK_NOTIFICATIONS = [
  {
    createdAt: "2022-11-04 21:34",
    desc: "아쉽지만 새로운 공유딜을 찾으러 가볼까요?",
    id: "1",
    message: "공유딜이 파기되었습니다.",
    title: "테스트방",
    type: "chat",
  },
  {
    createdAt: "2022-11-03 12:00",
    id: "2",
    message: "공유딜이 파기되었습니다.",
    title: "테스트방",
    type: "chat",
  },
];

const NotificationPage = () => {
  const [deleteMode, toggleDelete] = useToggle();
  const form = useNotificationDeleteForm();

  const handleDeleteAll = () => {
    // TODO: api 연결
  };

  return (
    <>
      <MetaTags />
      <Layout
        headerProps={{
          leftNode: <Header.Back />,
          rightNode: (
            <ConditionalRender
              condition={deleteMode}
              renderCase={{
                false: <Header.Delete onClick={toggleDelete} />,
                true: (
                  <Popup
                    cancelText="취소"
                    confirmText="삭제"
                    description={`알림을 전부 삭제하실건가요?\n삭제한 알림 내용은\n다시 확인할 수 없습니다.`}
                    title="알림 전체 삭제하기"
                    onConfirm={handleDeleteAll}
                  >
                    <Box as="button" type="button">
                      <Typography color="black2" fontSize="body2-m">
                        전체삭제
                      </Typography>
                    </Box>
                  </Popup>
                ),
              }}
            />
          ),
          title: "알림",
        }}
      >
        <FormProvider {...form}>
          <Container height="full" py="32">
            <ConditionalRender
              condition={MOCK_NOTIFICATIONS.length > 0}
              renderCase={{
                false: <NotificationEmpty />,
                true: (
                  <List
                    as="ol"
                    css={{ gap: "16" }}
                    fetchMore={() => {}}
                    list={MOCK_NOTIFICATIONS}
                    renderItem={(item) => (
                      <NotificationListItem
                        deleteMode={deleteMode}
                        key={item.id}
                        notification={item}
                      />
                    )}
                  />
                ),
              }}
            />
            {deleteMode && <NotificationDeleteButton />}
          </Container>
        </FormProvider>
      </Layout>
    </>
  );
};

export default NotificationPage;
