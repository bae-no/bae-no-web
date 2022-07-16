import { ForwardedRef, forwardRef } from "react";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

interface SelectProps {
  placeholder?: string;
  size?: "small" | "large";
  value?: string;
}

const Select = (
  { value, placeholder, size = "large", ...rest }: SelectProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const isSmall = size === "small";

  return (
    <Box
      align="center"
      backgroundColor={isSmall ? "black10" : "white"}
      borderColor="black7"
      borderRadius="xs"
      borderStyle="solid"
      borderWidth={isSmall ? "none" : "xxxxs"}
      flexDirection="row"
      gap="xxs"
      justify="space-between"
      px={isSmall ? "sm" : "md"}
      py={isSmall ? "xxs" : "sm"}
      ref={ref}
      width={!isSmall ? "full" : "fit"}
      {...rest}
    >
      <Typography
        color={isSmall || value ? "black2" : "black4"}
        fontSize={`body${isSmall ? "3" : "1"}-m`}
      >
        {value || placeholder}
      </Typography>
      <Icon color={isSmall ? "black2" : "black4"} name="arrow-bottom" />
    </Box>
  );
};

export default forwardRef(Select);
