import { GetServerSidePropsContext } from "next";

import { useCategoryListQuery, useGetShareDeal } from "src/graphql";
import { SettingFirstStepForm } from "src/modules/Chat/detailPage/SettingChat/SettingFirstStepForm";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";
import { Typography } from "src/ui/Typography";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const SettingChatPage = () => (
  <Layout headerProps={{ leftNode: <Header.Back /> }}>
    <Container gap="32" marginTop="32">
      <Typography color="black2" fontSize="headline2">
        수정할 공유딜에 대한
        <br />
        정보를 입력해주세요.
      </Typography>
      <SettingFirstStepForm />
    </Container>
  </Layout>
);

export default SettingChatPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query;

  return prefetchQueriesOnServerSideWithAuth([
    {
      queryHook: useCategoryListQuery,
    },
    {
      getParams: () => ({
        variables: {
          shareDealId: id,
        },
      }),
      queryHook: useGetShareDeal,
    },
  ])(context);
};
