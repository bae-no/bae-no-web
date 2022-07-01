import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";

export const contentContainerCss = sprinkles({
  bottom: "none",
  left: "none",
  outline: "none",
  position: "fixed",
  width: "full",
});

export const contentCss = style([
  sprinkles({
    bg: "white",
    borderTopRadius: "md",
    display: "flex",
    flexDirection: "column",
    gap: "lg",
    overflow: "hidden",
    position: "relative",
    width: "full",
  }),
  { padding: "4rem 1.6rem" },
]);
