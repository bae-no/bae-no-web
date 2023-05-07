import { style } from "@vanilla-extract/css";

import { sprinkles } from "src/ui/sprinkles.css";

const overlay = style([
  sprinkles({
    backgroundColor: "black1",
    inset: "0",
    position: "fixed",
    zIndex: 4,
  }),
  {
    opacity: 0.6,
  },
]);

const content = style([
  sprinkles({
    left: "half",
    position: "fixed",
    px: "32",
    top: "half",
    transform: "halfMinus",
    width: "full",
    zIndex: 5,
  }),
]);

export const updateDealStatus = {
  content,
  overlay,
};
