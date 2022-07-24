import { style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

const inputBaseCss = style([
  {
    outline: "none",
    selectors: {
      "&::placeholder": {
        color: theme.colors.black5,
      },
      "&:disabled": {
        color: theme.colors.black4,
      },
      "&:disabled::placeholder": {
        color: theme.colors.black4,
      },
    },
  },
  sprinkles({
    color: "black2",
  }),
]);

export const inputCss = recipe({
  base: inputBaseCss,
  defaultVariants: {
    size: "large",
  },
  variants: {
    size: {
      large: [fontCss({ fontSize: "body1-m" })],
      small: [fontCss({ fontSize: "body3-m" })],
    },
  },
});

const createBorderColorStyle = (color: keyof typeof theme["colors"]) => ({
  borderColor: theme.colors[color],
  selectors: {
    "&:focus-within": {
      borderColor: theme.colors[color],
    },
  },
});

const inputContainerBase = style([
  {
    borderStyle: "solid",
    selectors: {
      "&:focus-within": {
        borderColor: theme.colors.black5,
      },
    },
  },
  sprinkles({
    bg: "white",
    borderColor: "black7",
  }),
]);

export const inputContainerCss = recipe({
  base: inputContainerBase,
  defaultVariants: {
    size: "large",
    variant: "default",
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: theme.colors.black10,
      },
    },
    size: {
      large: { height: "4.8rem" },
      small: { height: "4rem" },
    },
    state: {
      invalid: createBorderColorStyle("danger1"),
      valid: createBorderColorStyle("success1"),
    },
    variant: {
      default: [
        {
          borderWidth: "0.1rem",
        },
        sprinkles({ br: "8", px: "16" }),
      ],
      underline: [
        {
          borderBottomWidth: "0.1rem",
        },
        sprinkles({ paddingRight: "8" }),
      ],
    },
  },
});

export type InputCss = RecipeVariants<typeof inputContainerCss>;
