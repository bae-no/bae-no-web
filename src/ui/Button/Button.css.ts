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
  backgroundColor: defaultColorVar,
  color: fontColorVar,
  ":active": {
    backgroundColor: activeColorVar,
  },
  ":disabled": {
    backgroundColor: disabledColorVar,
    color: disableFontColorVar,
  },
  selectors: {
    "&.disabled": {
      backgroundColor: disabledColorVar,
      color: disableFontColorVar,
    },
  },
});

const outlineStyle = style({
  borderColor: defaultColorVar,
  color: defaultColorVar,
  borderWidth: "1px",
  borderStyle: "solid",
  ":active": {
    borderColor: activeColorVar,
    color: activeColorVar,
  },
  selectors: {
    "&.disabled": {
      borderColor: disabledColorVar,
      color: disabledColorVar,
    },
  },
});

export const buttonStyle = recipe({
  base: sprinkles({ borderRadius: "xs" }),
  variants: {
    variant: {
      primary: primaryStyle,
      outline: outlineStyle,
    },
    color: {
      orange: {
        vars: {
          [defaultColorVar]: colors.orange2,
          [activeColorVar]: colors.orange7,
          [disabledColorVar]: colors.orange5,
          [fontColorVar]: colors.white,
          [disableFontColorVar]: colors.white,
        },
      },
      gray: {
        vars: {
          [defaultColorVar]: colors.black9,
          [activeColorVar]: colors.black11,
          [disabledColorVar]: colors.black9,
          [fontColorVar]: colors.black1,
          [disableFontColorVar]: colors.black6,
        },
      },
      white: {
        vars: {
          [defaultColorVar]: colors.white,
          [activeColorVar]: colors.white,
          [disabledColorVar]: colors.white,
          [fontColorVar]: colors.black1,
          [disableFontColorVar]: colors.black1,
        },
      },
    },
    size: {
      l: [
        sprinkles({ py: "sm", width: "full", gap: "xs" }),
        fontStyle({ fontSize: "body1-m" }),
      ],
      m: [
        sprinkles({ py: "xs", px: "md", width: "fit", gap: "xs" }),
        fontStyle({ fontSize: "body2-m" }),
      ],
      s: [
        sprinkles({ py: "xxs", px: "xs", width: "fit", gap: "xxs" }),
        fontStyle({ fontSize: "body3-m" }),
      ],
    },
  },
  defaultVariants: { variant: "primary", color: "orange", size: "l" },
});

export type ButtonStyle = RecipeVariants<typeof buttonStyle>;
