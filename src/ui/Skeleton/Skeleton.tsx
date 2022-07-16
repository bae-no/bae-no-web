import { createElement, forwardRef } from 'react';

import clsx from 'clsx';

import { BoxProps } from '../Box';
import { base } from '../reset.css';
import { sprinkles } from '../sprinkles.css';
import { parseProps } from '../utils';

import { skeletonCss } from './Skeleton.css';

const Skeleton = forwardRef(({ display = 'flex', flexDirection = 'column', as = 'div', ...props }: BoxProps, ref) => {
  const [atomProps] = parseProps(props);
  const styles = clsx(
    sprinkles({
      ...atomProps,
      display,
      flexDirection,
    }),
    skeletonCss,
    base
  );

  return createElement(as, {
    className: styles,
    ref,
  });
});

export default Skeleton;
