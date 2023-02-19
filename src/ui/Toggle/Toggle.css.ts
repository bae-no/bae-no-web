import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

export const toggleRootStyle = style([
  sprinkles({
    bg: "black7",
    br: "16",
    height: "fit",
    minSize: "24",
    p: "2",
  }),
  style({
    selectors: {
      '&[data-state="checked"]': {
        backgroundColor: theme.colors.orange2,
      },
    },
    transition: "background-color 300ms",
    width: "5rem",
  }),
]);

export const toggleThumbStyle = style([
  sprinkles({
    bg: "white",
    br: "half",
    display: "block",
    size: "24",
  }),
  {
    selectors: {
      '&[data-state="checked"]': {
        transform: "translateX(calc(100% - 0.2rem))",
      },
    },
    transition: "transform 300ms",
  },
]);
