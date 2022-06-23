import { keys, map, pipe, toArray } from "@fxts/core";
import { dehydrate } from "react-query";

import { AsyncBoundary } from "src/components/AsyncBoundary";
import { getMeQuery } from "src/queries";
import { queryClient } from "src/queryClient";
import { Typography, Toggle, Popup, Radio } from "src/ui";
import Icon from "src/ui/Icon/Icon";
import { SVG_ICON_MAP } from "src/ui/Icon/iconMap";
import { SERVER_BASE_URL, getServerSidePropsWithCookies } from "src/utils";

import type { NextPage } from "next";

const Test = () => {
  const { data } = getMeQuery.useQuery();

  return (
    <>
      {data?.response?.user.email}
      <Typography fontSize="body1-b">test</Typography>
      <Toggle />
      <button type="button" onClick={() => getMeQuery.fetchQuery()}>
        test
      </button>
    </>
  );
};

const LoadingComponent = () => <h1>...loading</h1>;
const ErrorFallback = () => (
  <div>
    <Typography fontSize="body2-b">test</Typography>
    <Toggle />
    <Popup
      buttonDirection="column"
      cancelText="tesaaaa"
      confirmText="test"
      description="fdsa"
      title="fas"
      onConfirm={() => {}}
    >
      <div>test</div>
    </Popup>
    {pipe(
      SVG_ICON_MAP,
      keys,
      map((key) => <Icon color="orange1" key={key} name={key} size="xxl" />),
      toArray
    )}
    <a href={`${SERVER_BASE_URL}/v1/auths/google`}>구글</a>;
    <a href={`${SERVER_BASE_URL}/v1/auths/kakao`}>카카오</a>;
    <Radio
      radioValue={[{ label: "test1", value: "testValue" }, { label: "test2" }]}
    />
  </div>
);

const Home: NextPage = () => (
  <AsyncBoundary
    errorFallback={ErrorFallback}
    loadingFallback={LoadingComponent}
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
