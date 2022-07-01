import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

const avatarRootBaseCss = style([
  sprinkles({
    alignItems: "center",
    br: "full",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  }),
  {
    border: `solid 1px ${theme.colors.black7} `,
  },
]);

const rootSize = {
  lg: [
    {
      height: "56px",
      width: "56px",
    },
  ],
  md: {
    height: "48px",
    width: "48px",
  },
  sm: {
    height: "40px",
    width: "40px",
  },
  xl: {
    height: "80px",
    width: "80px",
  },
  xs: {
    height: "28px",
    width: "28px",
  },
  xxl: {
    height: "96px",
    width: "96px",
  },
};

export const avatarRootCss = recipe({
  base: avatarRootBaseCss,
  variants: {
    rootSize,
  },
});

export const avatarImageCss = style([
  sprinkles({
    br: "full",
    size: "full",
  }),
  {
    objectFit: "cover",
  },
]);

const avatarFallbackBaseCss = sprinkles({
  alignItems: "center",
  color: "white",
  display: "flex",
  justifyContent: "center",
  size: "full",
});

export const avatarFallbackCss = recipe({
  base: avatarFallbackBaseCss,
  defaultVariants: { size: "md", type: "none" },
  variants: {
    size: {
      lg: fontCss({ fontSize: "headline2" }),
      md: fontCss({ fontSize: "headline3" }),
      sm: fontCss({ fontSize: "headline4" }),
      xl: fontCss({ fontSize: "headline1" }),
      xs: fontCss({ fontSize: "body1-b" }),
      xxl: fontCss({ fontSize: "headline1" }),
    },
    type: {
      none: {
        backgroundColor: theme.colors.black10,
      },
      text: {
        backgroundColor: theme.colors.orange3,
      },
    },
  },
});

export type RootSizeType = keyof typeof rootSize;
