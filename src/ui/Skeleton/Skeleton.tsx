import { forwardRef } from "react";

import { BoxProps, Box } from "../Box";

import { skeletonCss } from "./Skeleton.css";

export type SkeletonProps = Pick<
  BoxProps,
  | "as"
  | "className"
  | "height"
  | "width"
  | "borderRadius"
  | "padding"
  | "margin"
  | "size"
>;

const Skeleton = forwardRef(
  ({ className, borderRadius = "4", ...props }: SkeletonProps, ref) => (
    <Box
      borderRadius={borderRadius}
      className={[skeletonCss, className]}
      ref={ref}
      {...props}
    />
  ),
);

export default Skeleton;
