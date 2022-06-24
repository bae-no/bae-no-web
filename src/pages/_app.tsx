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
          <Component {...pageProps} />
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
