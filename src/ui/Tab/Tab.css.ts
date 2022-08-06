import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

export const tabRootCss = sprinkles({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: "24",
  width: "full",
});

export const tabListCss = style([
  sprinkles({
    display: "flex",
    gap: "8",
    overflow: "scroll",
    width: "full",
  }),
  {
    "::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
]);

export const typographyCss = style([
  sprinkles({
    backgroundColor: "white",
    borderColor: "black7",
    borderStyle: "solid",
    borderWidth: "1",
    color: "black3",
    cursor: "pointer",
    minWidth: "fit",
    outline: "none",
    px: "12",
    py: "8",
  }),
  {
    borderRadius: "5rem",
    selectors: {
      '&[data-state="active"]': {
        borderColor: theme.colors.orange2,
        color: theme.colors.orange2,
      },
    },
  },
]);
