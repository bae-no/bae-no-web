import { useMyProfileQuery } from "src/graphql";
import LeaveForm from "src/modules/user/leave/LeaveForm";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";
import { Typography } from "src/ui/Typography";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const LeavePage = () => {
  const { data } = useMyProfileQuery();
  return (
    <Layout
      headerProps={{
        leftNode: <Header.Back />,
        title: "탈퇴하기",
      }}
    >
      <Container gap="36" paddingTop="32">
        <Typography color="black2" fontSize="headline3">
          {`${data?.myProfile.nickname}님\n배달비노노를 떠나시나요?`}
        </Typography>
        <LeaveForm />
      </Container>
    </Layout>
  );
};

export default LeavePage;

export const getServerSideProps = prefetchQueriesOnServerSideWithAuth([
  {
    queryHook: useMyProfileQuery,
  },
]);
