import { style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { colors } from "../tokens/color";

const defaultStyle = style([
  sprinkles({ width: "xxxl", height: "lg", borderRadius: "xxs" }),
]);
const borderStyle = style([
  sprinkles({
    width: "auto",
    height: "auto",
    borderRadius: "md",
    px: "xs",
    py: "xxxs",
  }),
]);

export const labelStyle = recipe({
  base: fontCss({ fontSize: "caption1-b" }),
  variants: {
    variant: {
      default: defaultStyle,
      border: borderStyle,
    },
    color: {
      primary: {
        backgroundColor: colors.orange2,
        color: colors.white,
      },
      orange: {
        backgroundColor: colors.orange6,
        color: colors.orange2,
      },
      gray: {
        backgroundColor: colors.black8,
        color: colors.black3,
      },
      skyblue: {
        backgroundColor: colors.skyBlue1,
        color: colors.white,
      },
    },
  },
  defaultVariants: { variant: "default", color: "orange" },
});

export type LabelStyle = RecipeVariants<typeof labelStyle>;
