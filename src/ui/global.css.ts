import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  WebkitTapHighlightColor: "transparent",
  WebkitTouchCallout: "none",
  boxSizing: "border-box",
  paddingBottom: "env(safe-area-inset-bottom)",
  paddingTop: "env(safe-area-inset-top)",
  userSelect: "none",
});

globalStyle("html, body", {
  fontSize: "62.5%",
  margin: 0,
  padding: 0,
});

globalStyle("#__next", {
  height: "100%",
});
