import { ForwardedRef, forwardRef } from "react";

import { Box, BoxProps } from "../Box";

const Container = forwardRef(
  (props: BoxProps, ref: ForwardedRef<HTMLElement>) => (
    <Box position="relative" px="16" ref={ref} {...props} />
  ),
);

export default Container;
