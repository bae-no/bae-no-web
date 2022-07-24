import { keys, map, pipe, toArray } from "@fxts/core";

import { AsyncBoundary } from "src/components/AsyncBoundary";
import { Typography, Toggle, Popup, Skeleton } from "src/ui";
import Icon from "src/ui/Icon/Icon";
import { SVG_ICON_MAP } from "src/ui/Icon/iconMap";
import Layout from "src/ui/Layout/Layout";

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
      toArray,
    )}
  </div>
);

const Home = () => (
  <Layout showBottomTab headerProps={{ title: "홈" }}>
    <AsyncBoundary
      errorFallback={ErrorFallback}
      loadingFallback={LoadingComponent}
    >
      <Skeleton height="sm" width="full" />
      <Skeleton borderRadius="md" height="lg" width="lg" />
    </AsyncBoundary>
  </Layout>
);

export default Home;
