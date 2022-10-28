import MetaTags from "src/components/MetaTags";
import {
  ChattingRooms,
  HomeHead,
  useHeaderBackgroundColor,
} from "src/modules/home";
import { Box, Header, Layout } from "src/ui";

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
          <HomeHead ref={ref} />
          <ChattingRooms />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
