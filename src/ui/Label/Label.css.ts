import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { colors } from "../tokens/color";

const defaultCss = sprinkles({
  minWidth: "64",
  py: "4",
  textAlign: "center",
});

const borderCss = sprinkles({
  borderRadius: "16",
  py: "2",
  width: "auto",
});

export const labelCss = recipe({
  base: [
    fontCss({ fontSize: "caption1-b" }),
    sprinkles({ height: "fit", px: "8" }),
  ],
  compoundVariants: [
    { style: defaultCss, variants: { size: "medium", variant: "default" } },
    {
      style: sprinkles({ px: "4", py: "2" }),
      variants: { size: "small", variant: "default" },
    },
    { style: borderCss, variants: { size: "medium", variant: "border" } },
  ],
  defaultVariants: { color: "orange", size: "medium", variant: "default" },
  variants: {
    color: {
      gray: {
        backgroundColor: colors.black8,
        color: colors.black3,
      },
      orange: {
        backgroundColor: colors.orange6,
        color: colors.orange2,
      },
      primary: {
        backgroundColor: colors.orange2,
        color: colors.white,
      },
      skyblue: {
        backgroundColor: colors.skyBlue1,
        color: colors.white,
      },
    },
    size: {
      medium: {},
      small: sprinkles({ px: "4", py: "2" }),
    },
    variant: {
      border: {},
      default: sprinkles({ br: "4" }),
    },
  },
});

export type LabelCss = RecipeVariants<typeof labelCss>;
