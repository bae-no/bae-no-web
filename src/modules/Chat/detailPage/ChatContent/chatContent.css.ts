import { style } from "@vanilla-extract/css";

import { fontCss } from "src/ui/fontBase.css";
import { sprinkles } from "src/ui/sprinkles.css";

export const chatContentTextCss = style({
  maxWidth: "22.4rem",
});

export const textAreaCss = style([
  sprinkles({
    height: "full",
    minHeight: "20",
    outline: "none",
    width: "full",
  }),
  fontCss({ fontSize: "body2-m" }),
  {
    resize: "none",
  },
]);
