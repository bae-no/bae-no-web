import { ReactElement } from "react";

import { PullToCloseBottomDrawerProps } from "src/ui/BottomDrawer/PullToCloseBottomDrawer";

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
  extends Omit<PullToCloseBottomDrawerProps, "children"> {
  onValueChange: (value: string) => void;
  options: Array<SelectOption>;
  title?: string;
  trigger?: ReactElement;
  value?: string;
}
