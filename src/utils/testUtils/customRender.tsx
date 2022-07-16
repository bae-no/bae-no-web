/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

// TODO: relay provider 구현
function wrapper({ children }: { children: ReactElement }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
/**
 * 테스트 코드에서만 사용
 */
export const customRender = (element: ReactElement, options?: RenderOptions) => render(element, { wrapper, ...options });
