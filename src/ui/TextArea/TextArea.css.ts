import { style } from "@vanilla-extract/css";

import { fontCss, fontSize } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

export const textAreaCss = style([
  {
    "::placeholder": {
      color: theme.colors.black5,
      ...fontSize["body1-m"],
    },
    height: "12.2rem",
    outline: "none",
    resize: "none",
  },
  sprinkles({
    borderColor: "black7",
    borderRadius: "8",
    borderStyle: "solid",
    borderWidth: "1",
    color: "black2",
    px: "16",
    py: "12",
    width: "full",
  }),
  fontCss({ fontSize: "body1-m" }),
]);
