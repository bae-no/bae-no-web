import { createGlobalTheme } from "@vanilla-extract/css";
import { colors } from "./color";
import { layout } from "./layout";
import { size } from "./size";
import { space } from "./space";

export const theme = createGlobalTheme("#__next", {
  colors,
  layout,
  size,
  space,
});
