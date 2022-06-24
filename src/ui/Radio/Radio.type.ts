import { RadioGroupProps } from "@radix-ui/react-radio-group";

import { ComponentBaseProps } from "src/types";

export interface RadioProps
  extends ComponentBaseProps,
    Pick<RadioGroupProps, "onValueChange"> {
  contentValue: RadioContentValueProps[];
  defaultValue?: string;
}

export interface RadioContentValueProps {
  label: string;
  value?: string;
}
