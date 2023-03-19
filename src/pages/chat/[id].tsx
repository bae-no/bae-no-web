import { Root } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";

import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import { useGetChatDetail } from "src/graphql";
import { ChatMeun } from "src/modules/Chat/detailPage/ChatMenu";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Header, Layout } from "src/ui/Layout";
import { AlertDialogContent } from "src/ui/Popup/Contents";

const ChatContent = () => {
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };
  //   const { data } = useGetChatDetail(
  //     {
  //       input: {
  //         shareDealId: id,
  //         size: 20,
  //       },
  //     },
  //     {
  //       suspense: true,
  //     },
  //   );
  //   console.log(data);

  return <div>chatContent</div>;
};

const ChattingRoomPage = () => {
  const a = "a";

  return (
    <Layout
      headerProps={{
        leftNode: <Header.Back />,
        rightNode: <ChatMeun />,
        title: "title",
      }}
    >
      <SSRSafeSuspense fallback={<h1>로딩중</h1>}>
        <ChatContent />
      </SSRSafeSuspense>
    </Layout>
  );
};

export default ChattingRoomPage;
