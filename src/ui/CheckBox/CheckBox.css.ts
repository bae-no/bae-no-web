import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

export const checkBoxRootCss = style([
  sprinkles({
    alignItems: "center",
    backgroundColor: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    padding: "none",
  }),
  {
    border: "none",
  },
]);

export const checkBoxIndicatorCss = style([
  sprinkles({
    alignItems: "center",
    display: "flex",
  }),
  {
    color: theme.colors.black9,
    selectors: {
      '&[data-state="checked"]': {
        color: theme.colors.orange2,
      },
    },
  },
]);

export const checkBoxIconCss = style({
  color: "inherit",
});
