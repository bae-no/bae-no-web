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
>;

const Skeleton = forwardRef(({ className, ...props }: SkeletonProps, ref) => (
  <Box className={[skeletonCss, className]} ref={ref} {...props} />
));

export default Skeleton;
