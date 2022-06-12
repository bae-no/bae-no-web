import { createVar, style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";
import { fontStyle } from "../Typography/Typography.css";

const { colors } = theme;

const defaultColorVar = createVar();
const activeColorVar = createVar();
const disabledColorVar = createVar();

const fontColorVar = createVar();
const disableFontColorVar = createVar();

const primaryStyle = style({
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

export const buttonStyle = recipe({
  base: sprinkles({ borderRadius: "xs" }),
  defaultVariants: { color: "orange", size: "l", variant: "primary" },
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
        sprinkles({ gap: "xs", py: "sm", width: "full" }),
        fontStyle({ fontSize: "body1-m" }),
      ],
      m: [
        sprinkles({ gap: "xs", px: "md", py: "xs", width: "fit" }),
        fontStyle({ fontSize: "body2-m" }),
      ],
      s: [
        sprinkles({ gap: "xxs", px: "xs", py: "xxs", width: "fit" }),
        fontStyle({ fontSize: "body3-m" }),
      ],
    },
    variant: {
      outline: outlineStyle,
      primary: primaryStyle,
    },
  },
});

export type ButtonStyle = RecipeVariants<typeof buttonStyle>;
