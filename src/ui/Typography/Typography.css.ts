import { style } from "@vanilla-extract/css";

export const fontSizes = {
  1: style({ fontSize: "1.875rem", lineHeight: "2.5rem" }),
  2: style({ fontSize: "1.625rem", lineHeight: "2.1875rem" }),
  3: style({ fontSize: "1.375rem", lineHeight: "1.8125rem" }),
  4: style({ fontSize: "1.125rem", lineHeight: "1.5625rem" }),
  5: style({ fontSize: "1rem", lineHeight: "1.3125rem" }),
  6: style({ fontSize: "0.9375rem", lineHeight: "1.25rem" }),
  7: style({ fontSize: "0.8125rem", lineHeight: "1.125rem" }),
};

export const fontWeights = {
  bold: style({ fontWeight: "700" }),
  regular: style({ fontWeight: "400" }),
};

export const typographyDefaultStyle = style({
  overflowWrap: `break-word`,
  fontFamily:
    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif",
});
