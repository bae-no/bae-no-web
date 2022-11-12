import { keyframes, style } from "@vanilla-extract/css";

import { animationCss } from "../modalBase.css";
import { sprinkles } from "../sprinkles.css";

export const contentContainerCss = sprinkles({
  bottom: "0",
  left: "0",
  outline: "none",
  position: "fixed",
  width: "full",
  zIndex: 2,
});

export const contentCss = style([
  sprinkles({
    bg: "white",
    borderTopRadius: "16",
    display: "flex",
    flexDirection: "column",
    gap: "24",
    overflow: "hidden",
    position: "relative",
    width: "full",
  }),
  { padding: "4rem 1.6rem" },
]);

const slideUp = keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "translateY(0%)" },
});

const slideDown = keyframes({
  "0%": { transform: "translateY(0%)" },
  "100%": { transform: "translateY(100%)" },
});

export const contentAnimationCss = style({
  animation: `${slideUp} ${animationCss}`,
  selectors: {
    '&[data-state="closed"]': {
      animationName: slideDown,
    },
  },
});
