import { useId, forwardRef, ForwardedRef } from "react";

import { Root, Indicator, CheckboxProps } from "@radix-ui/react-checkbox";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { sprinkles } from "../sprinkles.css";
import { Typography } from "../Typography";

import { checkBoxRootCss, checkBoxIndicatorCss } from "./CheckBox.css";

interface CheckBoxProp extends CheckboxProps {
  checked: boolean;
  label: string;
  size?: "large" | "small";
  value: string;
}

const CheckBox = forwardRef(
  (
    {
      size = "small",
      checked,
      onCheckedChange,
      value,
      label,
      name,
    }: CheckBoxProp,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const fontSize = size === "large" ? "body1-b" : "body2-m";
    const id = useId();

    return (
      <Box alignItems="center" flexDirection="row" gap="xs">
        <Root
          checked={checked}
          className={checkBoxRootCss}
          id={id}
          name={name}
          ref={ref}
          value={value}
          onCheckedChange={onCheckedChange}
        >
          <Indicator forceMount className={checkBoxIndicatorCss}>
            <Icon
              color={checked ? "orange2" : "black9"}
              name="checkbox"
              size="lg"
            />
          </Indicator>
        </Root>
        <Typography
          as="label"
          className={sprinkles({ cursor: "pointer" })}
          fontSize={fontSize}
          htmlFor={id}
        >
          {label}
        </Typography>
      </Box>
    );
  }
);

export default CheckBox;
