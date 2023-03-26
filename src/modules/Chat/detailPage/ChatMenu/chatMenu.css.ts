import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { sprinkles } from "src/ui/sprinkles.css";

const contentOpenAnimaion = keyframes({
  "0%": { transform: "translateX(100%)" },
  "100%": { transform: "translateX(0)" },
});

const contentCloseAnimation = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(100%)" },
});

export const contentBaseCss = style([
  sprinkles({
    backgroundColor: "white",
    height: "full",
    position: "absolute",
    right: "0",
    zIndex: 3,
  }),
  {
    animationDuration: "0.5s",
    width: "calc(100% - 8rem)",
  },
]);

export const contentCss = recipe({
  base: contentBaseCss,
  variants: {
    isOpen: {
      false: {
        animationName: contentCloseAnimation,
      },
      true: {
        animationName: contentOpenAnimaion,
      },
    },
  },
});

const overLayOpenAnimation = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 0.6,
  },
});

const overlayCloseAnimation = keyframes({
  "0%": {
    opacity: 0.6,
  },
  "100%": {
    opacity: 0,
  },
});

export const overlayBaseCss = style([
  sprinkles({
    height: "full",
    inset: "0",
    position: "absolute",
    zIndex: 3,
  }),
  {
    animationDuration: "0.5s",
    backgroundColor: "black",
    opacity: 0.6,
  },
]);

export const overlayCss = recipe({
  base: overlayBaseCss,
  variants: {
    isOpen: {
      false: {
        animationName: overlayCloseAnimation,
      },
      true: {
        animationName: overLayOpenAnimation,
      },
    },
  },
});
