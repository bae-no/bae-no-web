import { style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

const fontSize = {
  headline1: { fontSize: "3.2rem", lineHeight: "4.2rem", fontWeight: "700" },
  headline2: { fontSize: "2.8rem", lineHeight: "3.8rem", fontWeight: "700" },
  headline3: { fontSize: "2.4rem", lineHeight: "3.2rem", fontWeight: "700" },
  headline4: { fontSize: "2rem", lineHeight: "2.8rem", fontWeight: "700" },
  headline5: { fontSize: "1.8rem", lineHeight: "2.6rem", fontWeight: "700" },
  headline6: { fontSize: "1.6rem", lineHeight: "2.4rem", fontWeight: "700" },
  "body1-m": { fontSize: "1.6rem", lineHeight: "2.4rem", fontWeight: "500" },
  "body1-r": { fontSize: "1.6rem", lineHeight: "2.4rem", fontWeight: "400" },
  "body2-m": { fontSize: "1.4rem", lineHeight: "2rem", fontWeight: "500" },
  "body2-r": { fontSize: "1.4rem", lineHeight: "2rem", fontWeight: "400" },
  "body3-m": { fontSize: "1.3rem", lineHeight: "1.8rem", fontWeight: "500" },
  "body3-r": { fontSize: "1.3rem", lineHeight: "1.8rem", fontWeight: "400" },
  "caption1-m": { fontSize: "1.2rem", lineHeight: "1.6rem", fontWeight: "500" },
  "caption1-r": { fontSize: "1.2rem", lineHeight: "1.6rem", fontWeight: "400" },
  "caption2-m": { fontSize: "1rem", lineHeight: "1.2rem", fontWeight: "500" },
  "caption2-r": { fontSize: "1rem", lineHeight: "1.2rem", fontWeight: "400" },
};

const base = style({
  overflowWrap: `break-word`,
  fontFamily:
    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif",
});

export const fontStyle = recipe({
  base,
  variants: { fontSize },
  defaultVariants: { fontSize: "body1-r" },
});

export type FontStyle = RecipeVariants<typeof fontStyle>;
