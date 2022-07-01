import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";

export const barCss = style([
  {
    backgroundColor: "#DFE2E6",
    borderRadius: "2.8rem",
    width: "4.1rem",
  },
  sprinkles({
    height: "xxs",
    left: "half",
    position: "absolute",
    top: "sm",
    transform: "xHalfMinus",
  }),
]);
