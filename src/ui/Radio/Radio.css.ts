import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

const { colors } = theme;

export const radioIndicatorCss = style([
  sprinkles({
    alignItems: "center",
    bg: "orange2",
    br: "half",
    display: "flex",
    justifyContent: "center",
    size: "full",
  }),
  {
    "::after": {
      backgroundColor: "white",
      borderRadius: "50%",
      content: '""',
      height: "50%",
      width: "50%",
    },
  },
]);

export const radioItemCss = style([
  sprinkles({
    bg: "white",
    borderRadius: "half",
    cursor: "pointer",
    padding: "0",
    size: "24",
  }),
  style({
    border: `solid 1px ${colors.black7}`,
    outline: "none",
    selectors: {
      '&[data-state="checked"]': {
        border: "none",
      },
    },
  }),
]);
