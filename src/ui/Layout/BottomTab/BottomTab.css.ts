import { style } from "@vanilla-extract/css";

export const bottomTabCss = style({
  bottom: "env(safe-area-inset-bottom)",
  boxShadow: "0 0 0.4rem rgba(0, 0, 0, 0.07)",
  height: "8rem",
});

export const addIconCss = style({
  top: "0",
  transform: "translateY(-2rem)",
});

export const bottomTabContainerCss = style({
  padding: "4rem 0",
});
