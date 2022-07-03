import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { fontCss } from "../fontBase.css";
import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

const avatarRootBaseCss = sprinkles({
  alignItems: "center",
  borderColor: "black7",
  borderStyle: "solid",
  borderWidth: "xxxxs",
  br: "full",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
});

const rootSize = {
  lg: [
    {
      height: "5.6rem",
      width: "5.6rem",
    },
  ],
  md: {
    height: "4.8rem",
    width: "4.8rem",
  },
  sm: {
    height: "4.0rem",
    width: "4.0rem",
  },
  xl: {
    height: "8.0rem",
    width: "8.0rem",
  },
  xs: {
    height: "2.8rem",
    width: "2.8rem",
  },
  xxl: {
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
