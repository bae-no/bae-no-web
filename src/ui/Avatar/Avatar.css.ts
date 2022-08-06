import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { fontCss } from "../fontBase.css";
import { theme } from "../tokens";

const avatarRootBaseCss = style({
  alignItems: "center",
  border: `solid 1px ${theme.colors.black7}`,
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
});

const rootSize = {
  "28": {
    height: "2.8rem",
    width: "2.8rem",
  },
  "40": {
    height: "4.0rem",
    width: "4.0rem",
  },
  "48": {
    height: "4.8rem",
    width: "4.8rem",
  },
  "56": {
    height: "5.6rem",
    width: "5.6rem",
  },
  "80": {
    height: "8.0rem",
    width: "8.0rem",
  },
  "96": {
    height: "9.6rem",
    width: "9.6rem",
  },
};

export const avatarRootCss = recipe({
  base: avatarRootBaseCss,
  variants: {
    rootSize,
  },
});

// const a = sprinkles({});
export const avatarImageCss = style({
  borderRadius: "100%",
  height: "100%",
  objectFit: "cover",
  width: "100%",
});

const avatarFallbackBaseCss = style({
  alignItems: "center",
  color: theme.colors.white,
  display: "flex",
  height: "100%",
  justifyContent: "center",
  width: "100%",
});

export const avatarFallbackCss = recipe({
  base: avatarFallbackBaseCss,
  defaultVariants: { size: "48", type: "none" },
  variants: {
    size: {
      "28": fontCss({ fontSize: "body1-b" }),
      "40": fontCss({ fontSize: "headline4" }),
      "48": fontCss({ fontSize: "headline3" }),
      "56": fontCss({ fontSize: "headline2" }),
      "80": fontCss({ fontSize: "headline1" }),
      "96": fontCss({ fontSize: "headline1" }),
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
