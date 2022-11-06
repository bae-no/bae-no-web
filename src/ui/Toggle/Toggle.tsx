import { ForwardedRef, forwardRef } from "react";

import { Root, Thumb } from "@radix-ui/react-switch";
import clsx from "clsx";

import { toggleRootStyle, toggleThumbStyle } from "./Toggle.css";

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  value?: string;
}

const Toggle = (props: ToggleProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <Root {...props} className={clsx([toggleRootStyle])} ref={ref}>
    <Thumb className={toggleThumbStyle} />
  </Root>
);

export default forwardRef(Toggle);
