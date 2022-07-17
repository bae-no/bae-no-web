import { forwardRef } from 'react';

import { BoxProps, Box } from '../Box';

import { skeletonCss } from './Skeleton.css';

export type SkeletonProps = Pick<BoxProps, 'as' | 'className' | 'height' | 'width' | 'borderRadius' | 'padding' | 'margin'>;

const Skeleton = forwardRef(({ className, ...props }: SkeletonProps) => <Box className={[skeletonCss, className]} {...props} />);

export default Skeleton;
