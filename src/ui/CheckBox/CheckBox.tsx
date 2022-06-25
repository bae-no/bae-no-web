import { useId, forwardRef, ForwardedRef, useState } from "react";

import { Root, Indicator, CheckboxProps } from "@radix-ui/react-checkbox";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { sprinkles } from "../sprinkles.css";
import { Typography } from "../Typography";

import { checkBoxRootCss } from "./CheckBox.css";

interface CheckBoxProp extends CheckboxProps {
  defaultChecked?: boolean;
  label: string;
  titleType?: boolean;
  value: string;
}

const CheckBox = forwardRef(
  (
    {
      titleType = false,
      defaultChecked = false,
      onCheckedChange,
      value,
      label,
    }: CheckBoxProp,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const size = titleType ? "body1-b" : "body2-m";
    const id = useId();
    const [checked, setCheck] = useState(defaultChecked);
    const handleCheckedChange = (e: boolean) => {
      if (onCheckedChange) {
        onCheckedChange(e);
      }
      setCheck(e);
    };
    return (
      <Box alignItems="center" flexDirection="row" gap="xs">
        <Root
          className={checkBoxRootCss}
          defaultChecked={checked}
          id={id}
          ref={ref}
          value={value}
          onCheckedChange={handleCheckedChange}
        >
          <Indicator forceMount>
            <Box ref={ref}>
              <Icon
                color={checked ? "orange2" : "black9"}
                name="checkbox"
                size="lg"
              />
            </Box>
          </Indicator>
        </Root>
        <Typography
          as="label"
          className={sprinkles({ cursor: "pointer" })}
          fontSize={size}
          htmlFor={id}
        >
          {label}
        </Typography>
      </Box>
    );
  }
);

export default CheckBox;
