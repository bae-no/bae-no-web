import { ForwardedRef, forwardRef, useMemo, useState } from "react";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

import { SelectBottomDrawer } from "./SelectBottomDrawer";
import { SelectBottomDrawerProps } from "./SelectBottomDrawer/SelectBottomDrawer.types";

interface SelectProps
  extends Pick<
    SelectBottomDrawerProps,
    "title" | "onValueChange" | "value" | "options"
  > {
  placeholder: string;
  size?: "small" | "large";
}

const Select = (
  {
    value,
    placeholder,
    size = "large",
    options,
    title,
    onValueChange,
    ...rest
  }: SelectProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [open, setOpen] = useState(false);
  const isSmall = size === "small";

  const selectLabel = useMemo(
    () => options.find(({ value: v }) => v === value)?.label,
    [value, options]
  );

  return (
    <SelectBottomDrawer
      open={open}
      options={options}
      title={title}
      trigger={
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
            {selectLabel || placeholder}
          </Typography>
          <Icon color={isSmall ? "black2" : "black4"} name="arrow-bottom" />
        </Box>
      }
      value={value}
      onOpenChange={setOpen}
      onValueChange={onValueChange}
    />
  );
};

export default forwardRef(Select);
