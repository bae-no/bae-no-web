import { style } from "@vanilla-extract/css";

import { sprinkles } from "src/ui/sprinkles.css";

export const mapCss = style([
  {
    height: "24rem",
  },
  sprinkles({
    borderColor: "black7",
    borderRadius: "8",
    borderStyle: "solid",
    borderWidth: "1",
    position: "relative",
    width: "full",
  }),
]);
