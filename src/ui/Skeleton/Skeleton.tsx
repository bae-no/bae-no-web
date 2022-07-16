import { AllHTMLAttributes, createElement, forwardRef } from 'react';

import clsx, { ClassValue } from 'clsx';

import { ComponentBaseProps } from 'src/types';

import { base, element } from '../reset.css';
import { sprinkles, Sprinkles } from '../sprinkles.css';
import { parseProps } from '../utils';

import { skeletonCss } from './Skeleton.css';

export interface SkeletonProps extends ComponentBaseProps, Omit<AllHTMLAttributes<HTMLElement>, 'className' | 'content' | 'translate' | 'color' | 'width' | 'height' | 'cursor' | 'size'>, Sprinkles {
  className?: ClassValue;
}

const Skeleton = forwardRef(({ display = 'flex', flexDirection = 'column', as = 'div', ...props }: SkeletonProps, ref) => {
  const [atomProps, nativeProps] = parseProps(props);
  const styles = clsx(
    sprinkles({
      ...atomProps,
      display,
      flexDirection,
    }),
    skeletonCss,
    base,
    element[as as keyof typeof element]
  );

  return createElement(as, {
    className: styles,
    ...nativeProps,
    ref,
  });
});

export default Skeleton;
