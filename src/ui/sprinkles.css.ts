import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { theme } from "./tokens";

const { colors, layout, space } = theme;

const responsiveProperties = defineProperties({
  conditions: {
    desktop: { "@media": "screen and (min-width: 1024px)" },
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
  },
  defaultCondition: "mobile",
  properties: {
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    borderRadius: layout,
    boxSizing: ["border-box", "content-box"],
    cursor: ["pointer"],
    display: ["none", "flex", "block", "inline-block", "inline", "grid"],
    flex: [0, 0.5, 1],
    flexDirection: ["row", "column", "row-reverse", "column-reverse"],
    gap: space,
    height: layout,
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    margin: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    marginTop: space,
    maxHeight: layout,
    maxWidth: layout,
    minHeight: layout,
    minWidth: layout,
    overflow: ["visible", "hidden", "scroll", "auto"],
    padding: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    paddingTop: space,
    position: ["absolute", "relative", "fixed", "sticky"],
    textAlign: ["center", "left", "right"],
    width: layout,
    zIndex: [-1, 0, 1, 2, 3, 4, 5],
  },
  responsiveArray: ["mobile", "tablet", "desktop"],
  shorthands: {
    br: ["borderRadius"],
    m: ["margin"],
    maxSize: ["maxWidth", "maxHeight"],
    minSize: ["minWidth", "minHeight"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    p: ["padding"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    size: ["width", "height"],
  },
});

const colorProperties = defineProperties({
  conditions: {
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
    lightMode: {},
  },
  defaultCondition: "lightMode",
  properties: {
    backgroundColor: colors,
    borderColor: colors,
    color: colors,
  },
  responsiveArray: ["lightMode", "darkMode"],
  shorthands: {
    bg: ["backgroundColor"],
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
