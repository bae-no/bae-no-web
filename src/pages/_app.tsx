import Head from "next/head";

import { useInit } from "src/hooks";

import type { AppProps } from "next/app";

import "src/ui/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useInit();

  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0, viewport-fit=cover"
          name="viewport"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
