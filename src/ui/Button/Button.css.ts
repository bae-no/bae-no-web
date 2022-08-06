import { createVar, style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

const { colors } = theme;

const defaultColorVar = createVar();
const activeColorVar = createVar();
const disabledColorVar = createVar();

const fontColorVar = createVar();
const disableFontColorVar = createVar();

const defaultStyle = style({
  ":active": {
    backgroundColor: activeColorVar,
  },
  ":disabled": {
    backgroundColor: disabledColorVar,
    color: disableFontColorVar,
  },
  backgroundColor: defaultColorVar,
  color: fontColorVar,
  selectors: {
    "&.disabled": {
      backgroundColor: disabledColorVar,
      color: disableFontColorVar,
    },
  },
});

const outlineStyle = style({
  ":active": {
    borderColor: activeColorVar,
    color: activeColorVar,
  },
  borderColor: defaultColorVar,
  borderStyle: "solid",
  borderWidth: "1px",
  color: defaultColorVar,
  selectors: {
    "&.disabled": {
      borderColor: disabledColorVar,
      color: disabledColorVar,
    },
  },
});

export const buttonCss = recipe({
  base: sprinkles({ borderRadius: "8" }),
  defaultVariants: { color: "orange", size: "l", variant: "default" },
  variants: {
    color: {
      gray: {
        vars: {
          [activeColorVar]: colors.black11,
          [defaultColorVar]: colors.black9,
          [disableFontColorVar]: colors.black6,
          [disabledColorVar]: colors.black9,
          [fontColorVar]: colors.black1,
        },
      },
      orange: {
        vars: {
          [activeColorVar]: colors.orange7,
          [defaultColorVar]: colors.orange2,
          [disableFontColorVar]: colors.white,
          [disabledColorVar]: colors.orange5,
          [fontColorVar]: colors.white,
        },
      },
      white: {
        vars: {
          [activeColorVar]: colors.white,
          [defaultColorVar]: colors.white,
          [disableFontColorVar]: colors.black1,
          [disabledColorVar]: colors.white,
          [fontColorVar]: colors.black1,
        },
      },
    },
    size: {
      l: [
        sprinkles({ gap: "8", py: "12", width: "full" }),
        fontCss({ fontSize: "body1-m" }),
      ],
      m: [
        sprinkles({ gap: "8", px: "16", py: "8", width: "fit" }),
        fontCss({ fontSize: "body2-m" }),
      ],
      s: [
        sprinkles({ gap: "4", px: "8", py: "4", width: "fit" }),
        fontCss({ fontSize: "body3-m" }),
      ],
    },
    variant: {
      default: defaultStyle,
      outline: outlineStyle,
    },
  },
});

export type ButtonCss = RecipeVariants<typeof buttonCss>;
