import { forwardRef, useId, ForwardedRef } from "react";

import {
  Root,
  Item,
  Indicator,
  RadioGroupProps,
} from "@radix-ui/react-radio-group";

import { ComponentBaseProps } from "src/types";

import { Box } from "../Box";
import { sprinkles } from "../sprinkles.css";
import { Typography } from "../Typography";

import { radioIndicatorCss, radioItemCss } from "./Radio.css";

interface RadioProps
  extends ComponentBaseProps,
    Pick<RadioGroupProps, "onValueChange"> {
  defaultValue?: string;
  radioValue: { label: string; value?: string }[];
}

const Radio = forwardRef(
  (
    { radioValue, onValueChange, defaultValue, ...rest }: RadioProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const id = useId();
    return (
      <Root
        {...rest}
        defaultValue={defaultValue}
        ref={ref}
        onValueChange={onValueChange}
      >
        <Box gap="lg">
          {radioValue.map(({ label, value }, index) => {
            const radioId = id + String(index);
            return (
              <Box alignItems="center" flexDirection="row" gap="md" key={label}>
                <Item
                  className={radioItemCss}
                  id={radioId}
                  value={value || label}
                >
                  <Indicator className={radioIndicatorCss} />
                </Item>
                <Typography
                  as="label"
                  className={sprinkles({ cursor: "pointer" })}
                  fontSize="body2-m"
                  htmlFor={radioId}
                >
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Root>
    );
  }
);

export default Radio;
