import { globalFontFace, globalStyle } from "@vanilla-extract/css";

globalFontFace("Pretendard", {
  fontDisplay: "swap",
  fontWeight: 700,
  src: "local('Pretendard Bold'), url('/fonts/woff2-subset/Pretendard-Bold.subset.woff2') format('woff2'), url('/fonts/woff-subset/Pretendard-Bold.subset.woff') format('woff')",
});

globalFontFace("Pretendard", {
  fontDisplay: "swap",
  fontWeight: 500,
  src: "local('Pretendard Medium'), url('/fonts/woff2-subset/Pretendard-Medium.subset.woff2') format('woff2'), url('/fonts/woff-subset/Pretendard-Medium.subset.woff') format('woff')",
});

globalFontFace("Pretendard", {
  fontDisplay: "swap",
  fontWeight: 400,
  src: "local('Pretendard Regular'), url('/fonts/woff2-subset/Pretendard-Regular.subset.woff2') format('woff2'), url('/fonts/woff-subset/Pretendard-Regular.subset.woff') format('woff')",
});

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
      maxHeight: "-webkit-fill-available",
    },
  },
  fontSize: "62.5%",
  height: "100vh",
  margin: 0,
  padding: 0,
});

globalStyle("#__next", {
  display: "flex",
  flexDirection: "column",
});
