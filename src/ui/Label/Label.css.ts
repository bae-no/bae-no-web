import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { colors } from "../tokens/color";

const defaultCss = sprinkles({
  borderRadius: "xxs",
  minWidth: "xxxl",
  px: "xs",
  py: "xs",
  textAlign: "center",
});

const borderCss = sprinkles({
  borderRadius: "md",
  px: "xs",
  py: "xxxs",
  size: "auto",
});

export const labelCss = recipe({
  base: fontCss({ fontSize: "caption1-b" }),
  defaultVariants: { color: "orange", variant: "default" },
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
    variant: {
      border: borderCss,
      default: defaultCss,
    },
  },
});

export type LabelCss = RecipeVariants<typeof labelCss>;
