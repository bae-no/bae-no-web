/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from "react";

import { render, RenderOptions } from "@testing-library/react";

function wrapper({ children }: { children: ReactElement }) {
  return children;
}
/**
 * 테스트 코드에서만 사용
 */
export const customRender = (element: ReactElement, options?: RenderOptions) =>
  render(element, { wrapper, ...options });
