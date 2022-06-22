import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

const { colors } = theme;

export const radioIndicatorStyle = style([
  sprinkles({
    alignItems: "center",
    bg: "orange2",
    br: "half",
    display: "flex",
    height: "full",
    justifyContent: "center",
    size: "full",
    width: "full",
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

export const radioItemStyle = style([
  sprinkles({
    bg: "white",
    borderRadius: "half",
    padding: "none",
    size: "lg",
  }),
  style({
    border: `solid 1px ${colors.black7}`,
  }),
]);

export const itemLabelBox = style([
  sprinkles({
    alignItems: "center",
    display: "flex",
    gap: "md",
  }),
]);

export const radioRootStyle = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    gap: "lg",
  }),
]);
