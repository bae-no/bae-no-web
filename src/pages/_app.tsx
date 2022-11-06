import dayjs from "dayjs";
import { LazyMotion, domAnimation } from "framer-motion";
import Head from "next/head";

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
    <Component {...pageProps} />
  </LazyMotion>
);

export default MyApp;
