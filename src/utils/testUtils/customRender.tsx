/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from "react";

import { render, RenderOptions } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import { queryClient } from "src/queryClient";

function wrapper({ children }: { children: ReactElement }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
}
/**
 * 테스트 코드에서만 사용
 */
export const customRender = (element: ReactElement, options?: RenderOptions) =>
  render(element, { wrapper, ...options });
