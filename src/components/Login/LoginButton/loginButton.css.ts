import { keyframes } from "@vanilla-extract/css";
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

export const buttonCss = recipe({
  base: {
    animation: `${buttonKeyframes} 5s`,
  },
  variants: {
    type: {
      apple: {
        backgroundColor: black1,
        color: white,
      },
      google: {
        backgroundColor: white,
        border: `solid ${space} ${black1}`,
        color: black1,
      },
      kakao: { backgroundColor: "#FAE64C", color: black1 },
    },
  },
});
