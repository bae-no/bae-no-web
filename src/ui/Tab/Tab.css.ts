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
    borderStyle: "solid",
    borderColor: "black7",
    borderWidth: "xxxxs",
    color: "black3",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    alignItems: "center",
    gap: "xs",
    backgroundColor: "white",
  }),
  {
    height: "3.2rem",
    width: "5.3rem",
    borderRadius: "5rem",
    selectors: {
      '&[data-state="active"]': {
        border: `solid 1px ${theme.colors.orange2}`,
        color: theme.colors.orange2,
      },
    },
  },
]);
