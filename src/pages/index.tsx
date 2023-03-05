import {
  HeadWithBackgroundColor,
  useHeaderBackgroundColor,
} from "src/components/HeadWithBackgroundColor";
import MetaTags from "src/components/MetaTags";
import { useHomeStaticQuery } from "src/graphql";
import ChattingRooms from "src/modules/home/ChattingRooms";
import SearchBar from "src/modules/home/HomeHead/SearchBar";
import UserInfo from "src/modules/home/HomeHead/UserInfo";
import { Box } from "src/ui/Box";
import { Header, Layout } from "src/ui/Layout";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const Home = () => {
  const [ref, backgroundColor] = useHeaderBackgroundColor();

  return (
    <>
      <MetaTags />
      <Layout
        showBottomTab
        headerProps={{
          backgroundColor,
          rightNode: <Header.Notification />,
          title: "홈", // TODO: 홈 title 변경
        }}
      >
        <Box gap="56">
          <HeadWithBackgroundColor
            css={{ gap: "8", paddingTop: "32" }}
            ref={ref}
          >
            <UserInfo />
            <SearchBar />
          </HeadWithBackgroundColor>
          <ChattingRooms />
        </Box>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = prefetchQueriesOnServerSideWithAuth([
  {
    queryHook: useHomeStaticQuery,
  },
]);
