import { entries, flatMap, fromEntries, keys, map, pipe } from "@fxts/core";
import { style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

const fontsBase = {
  body1: { fontSize: "1.6rem", lineHeight: "2.4rem" },
  body2: { fontSize: "1.4rem", lineHeight: "2rem" },
  body3: { fontSize: "1.3rem", lineHeight: "1.8rem" },
  caption1: { fontSize: "1.2rem", lineHeight: "1.6rem" },
  caption2: { fontSize: "1rem", lineHeight: "1.2rem" },
};

const fontWeights = {
  b: "700",
  m: "500",
  r: "400",
};

const fonts = pipe(
  fontsBase,
  entries,
  flatMap(([key, value]) =>
    map(
      (v) => [`${key}-${v}`, { ...value, fontWeight: fontWeights[v] }] as const,
      keys(fontWeights)
    )
  ),
  fromEntries
);

const fontSize = {
  headline1: { fontSize: "3.2rem", fontWeight: "700", lineHeight: "4.2rem" },
  headline2: { fontSize: "2.8rem", fontWeight: "700", lineHeight: "3.8rem" },
  headline3: { fontSize: "2.4rem", fontWeight: "700", lineHeight: "3.2rem" },
  headline4: { fontSize: "2rem", fontWeight: "700", lineHeight: "2.8rem" },
  headline5: { fontSize: "1.8rem", fontWeight: "700", lineHeight: "2.6rem" },
  ...fonts,
};

const base = style({
  fontFamily:
    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif",
  overflowWrap: `break-word`,
});

export const fontCss = recipe({
  base,
  defaultVariants: { fontSize: "body1-r" },
  variants: { fontSize },
});

export type FontCss = RecipeVariants<typeof fontCss>;
