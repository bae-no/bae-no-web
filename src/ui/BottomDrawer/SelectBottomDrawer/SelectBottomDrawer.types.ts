import { ReactElement } from "react";

import { DialogProps } from "@radix-ui/react-dialog";

interface SelectOption {
  label: string;
  value: string;
}

export interface SelectItemProps
  extends SelectOption,
    Pick<SelectBottomDrawerProps, "onValueChange"> {
  currentValue?: string;
}

export interface SelectBottomDrawerProps
  extends Required<Pick<DialogProps, "open" | "onOpenChange">> {
  onValueChange: (value: string) => void;
  options: Array<SelectOption>;
  title?: string;
  trigger?: ReactElement;
  value?: string;
}
