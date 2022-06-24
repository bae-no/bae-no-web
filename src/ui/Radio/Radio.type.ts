import { RadioGroupProps } from "@radix-ui/react-radio-group";

import { ComponentBaseProps } from "src/types";

export interface RadioProps
  extends ComponentBaseProps,
    Pick<RadioGroupProps, "onValueChange"> {
  contentValue: { label: string; value?: string }[];
  defaultValue?: string;
}
