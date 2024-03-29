import {
  HeadWithBackgroundColor,
  useHeaderBackgroundColor,
} from "src/components/HeadWithBackgroundColor";
import { useMyProfileQuery } from "src/graphql";
import UserHead from "src/modules/user/UserHead";
import UserPageSection from "src/modules/user/UserPageSection";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import { BottomTab, Header, Layout } from "src/ui/Layout";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const UserPage = () => {
  const [ref, backgroundColor] = useHeaderBackgroundColor();

  return (
    <Layout
      footer={<BottomTab />}
      headerProps={{
        backgroundColor,
        rightNode: <Header.Setting />,
        title: "마이페이지",
      }}
    >
      <Box gap="32" paddingBottom="16">
        <HeadWithBackgroundColor
          css={{ gap: "8", paddingBottom: "32", paddingTop: "16" }}
          ref={ref}
        >
          <UserHead />
        </HeadWithBackgroundColor>
        <Container>
          <UserPageSection />
        </Container>
      </Box>
    </Layout>
  );
};

export default UserPage;

export const getServerSideProps = prefetchQueriesOnServerSideWithAuth([
  {
    queryHook: useMyProfileQuery,
  },
]);
