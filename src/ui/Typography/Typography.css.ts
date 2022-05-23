import { style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { entries, flatMap, fromEntries, keys, map, pipe } from "@fxts/core";

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
  headline1: { fontSize: "3.2rem", lineHeight: "4.2rem", fontWeight: "700" },
  headline2: { fontSize: "2.8rem", lineHeight: "3.8rem", fontWeight: "700" },
  headline3: { fontSize: "2.4rem", lineHeight: "3.2rem", fontWeight: "700" },
  headline4: { fontSize: "2rem", lineHeight: "2.8rem", fontWeight: "700" },
  headline5: { fontSize: "1.8rem", lineHeight: "2.6rem", fontWeight: "700" },
  ...fonts,
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
