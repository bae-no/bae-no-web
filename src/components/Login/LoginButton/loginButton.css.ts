import { keyframes, createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "src/ui/tokens";

const {
  colors: { black1, white },
  space: { 1: space },
} = theme;

const buttonKeyframes = keyframes({
  "0%": { opacity: "0" },
  "100%": { opacity: "1", transform: "translateZ(0)" },
  "70%": { opacity: "0", transform: "translate3d(0, 100%, 0)" },
});

const buttonColor = createVar();

export const buttonCss = recipe({
  base: {
    animation: `${buttonKeyframes} 4.5s`,
  },
  variants: {
    type: {
      apple: {
        ":active": { backgroundColor: buttonColor },
        backgroundColor: buttonColor,
        color: white,
        vars: {
          [buttonColor]: black1,
        },
      },
      google: {
        ":active": { backgroundColor: buttonColor },
        backgroundColor: buttonColor,
        border: `solid ${space} ${black1}`,
        color: black1,
        vars: {
          [buttonColor]: white,
        },
      },
      kakao: {
        ":active": { backgroundColor: buttonColor },
        backgroundColor: buttonColor,
        color: black1,
        vars: {
          [buttonColor]: "#FAE64C",
        },
      },
    },
  },
});
