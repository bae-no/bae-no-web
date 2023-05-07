import { ReactNode } from "react";

import * as RadixTooltip from "@radix-ui/react-tooltip";

import { tooltipArrowCss, tooltipContentCss } from "./Tooltip.css";

interface TooltipProps extends RadixTooltip.TooltipProps {
  children?: ReactNode;
  onClick?: VoidFunction;
  trigger?: ReactNode;
}

const Tooltip = ({ children, trigger, onClick, ...props }: TooltipProps) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root {...props}>
      <RadixTooltip.Trigger onClick={onClick}>{trigger}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className={tooltipContentCss}>
          {children}
          <RadixTooltip.Arrow className={tooltipArrowCss} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export default Tooltip;
