import { style } from "@vanilla-extract/css";

export const bottomTabCss = style({
  // bottom: "env(safe-area-inset-bottom)", FIXME: 앱에서 처리 할지 고민 후 삭제 or 주석 제거
  boxShadow: "0 0 0.4rem rgba(0, 0, 0, 0.07)",
  height: "8rem",
});

export const addIconCss = style({
  top: "0",
  transform: "translateY(-2rem)",
});

export const bottomTabContainerCss = style({
  padding: "4rem 0",
  zIndex: 1,
});
