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
  "@supports": {
    "(-webkit-touch-callout: none)": {
      height: "-webkit-fill-available",
    },
  },
  fontSize: "62.5%",
  height: "100vh",
  margin: 0,
  padding: 0,
});

globalStyle("#__next", {
  height: "100%",
});
