import { forwardRef } from 'react';

import clsx, { ClassValue } from 'clsx';

import { BoxProps, Box } from '../Box';
import { base } from '../reset.css';
import { sprinkles, Sprinkles } from '../sprinkles.css';

import { skeletonCss } from './Skeleton.css';

export interface SkeletonProps extends BoxProps, Pick<BoxProps, 'className' | 'height' | 'width' | 'borderRadius' | 'display' | 'flexDirection' | 'padding' | 'margin'>, Sprinkles {
  className?: ClassValue;
}

const Skeleton = forwardRef(({ ...props }: SkeletonProps) => {
  const styles = clsx(
    sprinkles({
      ...props,
    }),
    skeletonCss,
    base
  );

  return <Box className={styles} />;
});

export default Skeleton;
