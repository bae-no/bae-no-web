import { createGlobalTheme } from "@vanilla-extract/css";

import { colors } from "./color";
import { layout } from "./layout";
import { space } from "./space";
import { transform } from "./transform";

export const theme = createGlobalTheme("body", {
  colors,
  layout,
  space,
  transform,
});
