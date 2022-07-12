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
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black7",
    borderStyle: "solid",
    borderWidth: "xxxxs",
    color: "black3",
    cursor: "pointer",
    display: "flex",
    gap: "xs",
    justifyContent: "center",
  }),
  {
    borderRadius: "5rem",
    height: "3.2rem",
    selectors: {
      '&[data-state="active"]': {
        border: `solid 1px ${theme.colors.orange2}`,
        color: theme.colors.orange2,
      },
    },
    width: "5.3rem",
  },
]);
