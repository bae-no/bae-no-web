import Head from "next/head";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";

import { useInit } from "src/hooks";
import { getClientEnvironment } from "src/utils/relay/client_environment";

import type { AppProps } from "next/app";

import "src/ui/global.css";

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  useInit();
  return (
    <RelayEnvironmentProvider environment={env}>
      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0, viewport-fit=cover"
          name="viewport"
        />
      </Head>
      <Component {...pageProps} {...relayProps} />
    </RelayEnvironmentProvider>
  );
};

export default MyApp;
