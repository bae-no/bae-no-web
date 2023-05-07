import { keyframes, style } from "@vanilla-extract/css";

import { sprinkles } from "./sprinkles.css";

export const animationCss = "300ms cubic-bezier(0.16, 1, 0.3, 1) forwards";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.7 },
});

const overlayHide = keyframes({
  "0%": { opacity: 0.7 },
  "100%": { opacity: 0 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const contentHide = keyframes({
  "0%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
  "100%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
});

export const overlayCss = style([
  {
    animation: `${overlayShow} ${animationCss}`,
    inset: 0,
    selectors: {
      '&[data-state="closed"]': {
        animationName: overlayHide,
      },
    },
    zIndex: 1,
  },
  sprinkles({ bg: "black1", position: "fixed", zIndex: 1 }),
]);

export const contentCss = style([
  {
    animation: `${contentShow} ${animationCss}`,
    selectors: {
      '&[data-state="closed"]': {
        animationName: contentHide,
      },
    },
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
  sprinkles({ left: "half", top: "half", transform: "halfMinus", zIndex: 2 }),
]);
