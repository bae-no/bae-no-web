import {
  DehydratedState,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { domAnimation, LazyMotion } from "framer-motion";
import Head from "next/head";

import { queryClient } from "src/utils/queryClient";

import type { AppProps } from "next/app";

import "src/ui/global.css";

import("dayjs/locale/ko");

dayjs.locale("ko");

const MyApp = ({ Component, pageProps }: AppProps) => (
  <LazyMotion strict features={domAnimation}>
    <Head>
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0, viewport-fit=cover"
        name="viewport"
      />
    </Head>
    <QueryClientProvider client={queryClient}>
      <Hydrate
        state={
          (pageProps as { dehydratedState: DehydratedState }).dehydratedState
        }
      >
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  </LazyMotion>
);

export default MyApp;
