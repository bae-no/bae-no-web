import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { queryClient } from "src/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
