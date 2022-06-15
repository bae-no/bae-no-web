import { keyframes, style } from "@vanilla-extract/css";

import { sprinkles } from "./sprinkles.css";

const animationCss = "300ms cubic-bezier(0.16, 1, 0.3, 1) forwards";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.7 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

export const overlayCss = style([
  {
    animation: `${overlayShow} ${animationCss}`,
    inset: 0,
  },
  sprinkles({ bg: "black1", position: "fixed" }),
]);

export const contentCss = style([
  {
    animation: `${contentShow} ${animationCss}`,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
]);
