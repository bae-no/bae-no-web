import { style } from "@vanilla-extract/css";

import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

export const tooltipContentCss = style([
  {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    position: "relative",
    userSelect: "none",
    willChange: "transform",
    zIndex: 1,
  },
  sprinkles({
    backgroundColor: "orange2",
    borderRadius: "10",
    color: "white",
    px: "12",
    py: "8",
  }),
  fontCss({ fontSize: "body2-m" }),
]);

export const tooltipArrowCss = style({
  fill: theme.colors.orange2,
});
