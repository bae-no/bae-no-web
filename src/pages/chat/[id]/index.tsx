import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import { useChatStatus } from "src/graphql";
import { ChatWrapper } from "src/modules/Chat/ChatWrapper";
import { ChatContent } from "src/modules/Chat/detailPage/ChatContent";
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
        <SSRSafeSuspense fallback={<h1>로딩중....</h1>}>
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
  ])(context);
};

export default ChattingRoomPage;
