import { style } from "@vanilla-extract/css";

import { contentCss } from "../modalBase.css";
import { sprinkles } from "../sprinkles.css";

export const popupContentCss = style([
  {
    width: "31.1rem",
  },
  contentCss,
  sprinkles({ bg: "white", br: "sm", p: "lg", position: "fixed" }),
]);
