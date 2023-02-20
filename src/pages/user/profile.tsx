import { useMyProfileQuery } from "src/graphql";
import EditProfileForm from "src/modules/user/profile/EditProfileForm";
import { Avatar } from "src/ui/Avatar";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const ProfilePage = () => (
  <Layout
    headerProps={{
      leftNode: <Header.Back />,
      title: "프로필설정",
    }}
  >
    <Container align="center" gap="36" paddingTop="32">
      <Avatar size="96" text="불" />
      <EditProfileForm />
    </Container>
  </Layout>
);

export default ProfilePage;

export const getServerSideProps = prefetchQueriesOnServerSideWithAuth([
  {
    queryHook: useMyProfileQuery,
  },
]);
