import { style } from "@vanilla-extract/css";

export const base = style({
  margin: 0,
  padding: 0,
  border: 0,
  boxSizing: "border-box",
});

const button = style({
  background: 0,
  border: 0,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
});

const list = style({
  listStyle: "none",
});

export const element = {
  button,
  ul: list,
  ol: list,
};
