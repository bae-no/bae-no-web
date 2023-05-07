import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import { useChatParticipants, useChatStatus } from "src/graphql";
import { ChatWrapper } from "src/modules/Chat/ChatWrapper";
import { ChatContent } from "src/modules/Chat/detailPage/ChatContent";
import { ChatSkeleton } from "src/modules/Chat/detailPage/ChatContent/ChatSkeleton";
import { ChatTextArea } from "src/modules/Chat/detailPage/ChatContent/ChatTextArea";
import { ChatMeun } from "src/modules/Chat/detailPage/ChatMenu";
import { Header, Layout } from "src/ui/Layout";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const ChattingRoomPage = () => {
  const router = useRouter();
  const { title } = router.query as { [key: string]: string };

  return (
    <Layout
      footer={<ChatTextArea />}
      headerProps={{
        leftNode: <Header.Back />,
        rightNode: <ChatMeun />,
        title,
      }}
    >
      <>
        <ChatWrapper />
        <SSRSafeSuspense fallback={<ChatSkeleton />}>
          <ChatContent />
        </SSRSafeSuspense>
      </>
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query as { [key: string]: string };

  return prefetchQueriesOnServerSideWithAuth([
    {
      getParams: () => ({
        variables: {
          input: {
            shareDealId: id,
          },
        },
      }),
      queryHook: useChatStatus,
    },
    {
      getParams: () => ({
        variables: {
          input: {
            shareDealId: id,
          },
          shareDealId: id,
        },
      }),
      queryHook: useChatParticipants,
    },
  ])(context);
};

export default ChattingRoomPage;
