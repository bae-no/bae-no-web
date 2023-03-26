import { useRouter } from "next/router";

import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import { ChatContent } from "src/modules/Chat/detailPage/ChatContent";
import { ChatMeun } from "src/modules/Chat/detailPage/ChatMenu";
import { Header, Layout } from "src/ui/Layout";

const ChattingRoomPage = () => {
  const router = useRouter();
  const { title } = router.query as { [key: string]: string };

  return (
    <Layout
      headerProps={{
        leftNode: <Header.Back />,
        rightNode: <ChatMeun />,
        title,
      }}
    >
      <SSRSafeSuspense fallback={<h1>로딩중</h1>}>
        <ChatContent />
      </SSRSafeSuspense>
    </Layout>
  );
};

export default ChattingRoomPage;
