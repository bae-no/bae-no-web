import { style } from "@vanilla-extract/css";

import { sprinkles } from "src/ui/sprinkles.css";

export const pageMarginTopMarginBottom = style([
  {
    marginTop: "13.6rem",
  },
  sprinkles({
    marginBottom: "48",
  }),
]);
