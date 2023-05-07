import { style } from "@vanilla-extract/css";

import { sprinkles } from "src/ui/sprinkles.css";

const overlay = style([
  sprinkles({
    backgroundColor: "black1",
    height: "full",
    inset: "0",
    position: "absolute",
    zIndex: 4,
  }),
  {
    opacity: 0.6,
  },
]);

const content = style([
  sprinkles({
    left: "half",
    position: "absolute",
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
