import Head from "next/head";
import { Hydrate, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import { useInit } from "src/hooks";
import { queryClient } from "src/queryClient";

import type { AppProps } from "next/app";

import "src/ui/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useInit();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Head>
            <meta
              content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0, viewport-fit=cover"
              name="viewport"
            />
          </Head>
          <Component {...pageProps} />
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
