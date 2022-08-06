// FIXME: relay test - CSR
import { keys, map, pipe, toArray } from "@fxts/core";
import dynamic from "next/dynamic";

import { AsyncBoundary } from "src/components/AsyncBoundary";
import { Typography, Toggle, Popup } from "src/ui";
import Icon from "src/ui/Icon/Icon";
import { SVG_ICON_MAP } from "src/ui/Icon/iconMap";

import type { NextPage } from "next";

const RelayTest = dynamic(() => import("../components/RelayTest"), {
  ssr: false,
});

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
      map((key) => <Icon color="orange1" key={key} name={key} size="48" />),
      toArray,
    )}
  </div>
);

const Home: NextPage = () => (
  <AsyncBoundary
    errorFallback={ErrorFallback}
    loadingFallback={LoadingComponent}
  >
    <RelayTest />
  </AsyncBoundary>
);

export default Home;
