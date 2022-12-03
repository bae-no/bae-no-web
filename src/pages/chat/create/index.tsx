import CreateChat from "src/modules/Chat/Create";
import { Header, Layout } from "src/ui/Layout";
import { withGraphql } from "src/utils/graphql/withGraphql";

const CreateChatPage = () => (
  <Layout
    as="form"
    headerProps={{
      leftNode: <Header.Back />,
    }}
  >
    <CreateChat />
  </Layout>
);

export default withGraphql(CreateChatPage);
