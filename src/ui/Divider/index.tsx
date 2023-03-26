import * as Separator from "@radix-ui/react-separator";

import { Box, BoxProps } from "../Box";

interface DividerProps
  extends Pick<
      Separator.SeparatorProps,
      "asChild" | "orientation" | "decorative"
    >,
    BoxProps {}

const Divider = (props: DividerProps) => <Box as={Separator.Root} {...props} />;

export default Divider;
