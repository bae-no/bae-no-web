import { useId, forwardRef, ForwardedRef, ReactNode } from "react";

import { Root, Indicator, CheckboxProps } from "@radix-ui/react-checkbox";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { Sprinkles, sprinkles } from "../sprinkles.css";
import { Typography } from "../Typography";

import {
  checkBoxRootCss,
  checkBoxIndicatorCss,
  checkBoxIconCss,
} from "./CheckBox.css";

interface CheckBoxProp extends CheckboxProps {
  css?: Sprinkles;
  label?: string;
  rightNode?: ReactNode;
  size?: "large" | "small";
}

const CheckBox = forwardRef(
  (
    {
      size = "small",
      checked,
      onCheckedChange,
      defaultChecked,
      value,
      label,
      name,
      css,
      rightNode,
    }: CheckBoxProp,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const fontSize = size === "large" ? "body1-b" : "body2-m";
    const id = useId();

    return (
      <Box alignItems="center" flexDirection="row" gap="8" {...css}>
        <Root
          checked={checked}
          className={checkBoxRootCss}
          defaultChecked={defaultChecked}
          id={id}
          name={name}
          ref={ref}
          value={value}
          onCheckedChange={onCheckedChange}
        >
          <Indicator forceMount className={checkBoxIndicatorCss}>
            <Icon className={checkBoxIconCss} name="checkbox" size="24" />
          </Indicator>
        </Root>
        <Box flexDirection="row" justifyContent="space-between" width="full">
          {label && (
            <Typography
              as="label"
              className={sprinkles({ cursor: "pointer" })}
              fontSize={fontSize}
              htmlFor={id}
            >
              {label}
            </Typography>
          )}
          <Box flexDirection="row">{rightNode}</Box>
        </Box>
      </Box>
    );
  },
);

export default CheckBox;
