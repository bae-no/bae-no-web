import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

export const toggleRootStyle = style([
  sprinkles({
    minSize: "lg",
    bg: "black7",
    br: "md",
    p: "xxxs",
  }),
  style({
    width: "5rem",
    transition: "background-color 300ms",
    selectors: {
      '&[data-state="checked"]': {
        backgroundColor: theme.colors.orange2,
      },
    },
  }),
]);

export const toggleThumbStyle = style([
  sprinkles({
    display: "block",
    size: "lg",
    bg: "white",
    br: "half",
  }),
  {
    transition: "transform 300ms",
    selectors: {
      '&[data-state="checked"]': {
        transform: "translateX(calc(100% - 0.2rem))",
      },
    },
  },
]);
