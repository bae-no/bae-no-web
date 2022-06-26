import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";

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
]);
