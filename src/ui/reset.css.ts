import { style } from "@vanilla-extract/css";

export const base = style({
  border: 0,
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  textDecoration: "none",
});

const button = style({
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  background: 0,
  border: 0,
  cursor: "pointer",
});

const list = style({
  listStyle: "none",
});

export const element = {
  button,
  ol: list,
  ul: list,
};
