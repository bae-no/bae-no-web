import type { NextPage } from "next";
import { dehydrate } from "react-query";
import { AsyncBoundary } from "src/components/AsyncBoundary";
import { getMeQuery } from "src/queries";
import { queryClient } from "src/queryClient";
import { SERVER_BASE_URL, getServerSidePropsWithCookies } from "src/utils";

function Test() {
  const { data } = getMeQuery.useQuery();
  console.log(data);

  return (
    <>
      {data?.response?.user.email}
      <button type="button" onClick={() => getMeQuery.fetchQuery()}>
        test
      </button>
    </>
  );
}

const LoadingComponent = () => <h1>...loading</h1>;
const ErrorFallback = () => (
  <div>
    <a href={`${SERVER_BASE_URL}/v1/auths/google`}>구글</a>;
    <a href={`${SERVER_BASE_URL}/v1/auths/kakao`}>카카오</a>;
  </div>
);

const Home: NextPage = () => (
  <AsyncBoundary
    loadingFallback={LoadingComponent}
    errorFallback={ErrorFallback}
  >
    <Test />
  </AsyncBoundary>
);

export default Home;

export const getServerSideProps = getServerSidePropsWithCookies(async () => {
  getMeQuery.prefetchQuery();
  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      data: null,
      dehydratedState,
    },
  };
});
