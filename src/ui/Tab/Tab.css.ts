import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";
import { theme } from "../tokens";

export const tabRootCss = sprinkles({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: "lg",
});

export const tabListCss = style([
  sprinkles({
    display: "flex",
    gap: "xs",
    overflow: "scroll",
    width: "full",
  }),
  {
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
]);

export const typographyCss = style([
  sprinkles({
    backgroundColor: "white",
    borderColor: "black7",
    borderStyle: "solid",
    borderWidth: "xxxxs",
    color: "black3",
    cursor: "pointer",
    minWidth: "fit",
    outline: "none",
    px: "sm",
    py: "xs",
  }),
  {
    borderRadius: "5rem",
    padding: "0.6rem 1.4rem",
    selectors: {
      '&[data-state="active"]': {
        border: `solid 1px ${theme.colors.orange2}`,
        color: theme.colors.orange2,
      },
    },
  },
]);
