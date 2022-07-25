import ChattingRooms from "src/modules/home/ChattingRooms";
import HomeHead from "src/modules/home/HomeHead";
import { useHeaderBackgroundColor } from "src/modules/home/hooks";
import { Box, Header, Layout } from "src/ui";

const Home = () => {
  const [ref, backgroundColor] = useHeaderBackgroundColor();

  return (
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
  );
};

export default Home;
