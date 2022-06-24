import { AriaAttributes, AriaRole } from "react";

export interface ComponentBaseProps extends AriaAttributes {
  id?: string;
  role?: AriaRole;
  tabIndex?: number;
}
