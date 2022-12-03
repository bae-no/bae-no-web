import { GetStaticProps } from "next";

import { useCategoriesQuery } from "src/graphql";
import CreateChat from "src/modules/Chat/Create";
import { Header, Layout } from "src/ui/Layout";
import { prefetchQueryOnServerSide } from "src/utils/prefetchQueryOnServerSide";

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

export default CreateChatPage;

export const getStaticProps: GetStaticProps = async () => {
  const { dehydratedState } = await prefetchQueryOnServerSide(
    useCategoriesQuery.getKey(),
    useCategoriesQuery.fetcher(),
  );
  return {
    props: {
      dehydratedState,
    },
  };
};
