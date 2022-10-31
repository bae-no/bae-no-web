import { recipe } from "@vanilla-extract/recipes";

import { sprinkles } from "src/ui/sprinkles.css";

export const stepIndicatorCss = recipe({
  base: [
    {
      height: "0.6rem",
    },
    sprinkles({ br: "56" }),
  ],
  variants: {
    active: {
      false: [
        sprinkles({
          bg: "black8",
        }),
        { width: "0.6rem" },
      ],
      true: sprinkles({
        bg: "orange2",
        width: "24",
      }),
    },
  },
});
