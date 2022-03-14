import { style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

const fontSize = {
  typo1: { fontSize: "1.875rem", lineHeight: "2.5rem" },
  typo2: { fontSize: "1.625rem", lineHeight: "2.1875rem" },
  typo3: { fontSize: "1.375rem", lineHeight: "1.8125rem" },
  typo4: { fontSize: "1.125rem", lineHeight: "1.5625rem" },
  typo5: { fontSize: "1rem", lineHeight: "1.3125rem" },
  typo6: { fontSize: "0.9375rem", lineHeight: "1.25rem" },
  typo7: { fontSize: "0.8125rem", lineHeight: "1.125rem" },
};

const fontWeight = {
  bold: { fontWeight: "700" },
  semiBold: { fontWeight: "600" },
  regular: { fontWeight: "400" },
};

const base = style({
  overflowWrap: `break-word`,
  fontFamily:
    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif",
});

export const fontStyle = recipe({
  base,
  variants: { fontSize, fontWeight },
  defaultVariants: { fontSize: "typo5", fontWeight: "regular" },
});

export type FontStyle = RecipeVariants<typeof fontStyle>;
