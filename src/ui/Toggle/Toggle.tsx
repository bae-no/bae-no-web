import { Root, Thumb } from "@radix-ui/react-switch";
import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";
import { base } from "../reset.css";
import { toggleRootStyle, toggleThumbStyle } from "./Toggle.css";

interface ToggleProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

function Toggle(props: ToggleProps, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <Root {...props} ref={ref} className={clsx([toggleRootStyle, base])}>
      <Thumb className={toggleThumbStyle} />
    </Root>
  );
}

export default forwardRef(Toggle);
