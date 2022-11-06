import { Box, BoxProps } from "../Box";

const Container = (props: BoxProps) => (
  <Box position="relative" px="16" {...props} />
);

export default Container;
