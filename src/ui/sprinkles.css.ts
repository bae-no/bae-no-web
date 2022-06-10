import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { theme } from "./tokens";

const { colors, layout, space } = theme;

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    display: ["none", "flex", "block", "inline", "grid"],
    position: ["absolute", "relative", "fixed", "sticky"],
    flexDirection: ["row", "column"],
    flex: [0, 0.5, 1],
    gap: space,
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    padding: space,
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    margin: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    cursor: ["pointer"],
    width: layout,
    minWidth: layout,
    maxWidth: layout,
    height: layout,
    minHeight: layout,
    maxHeight: layout,
    borderRadius: layout,
    boxSizing: ["border-box", "content-box"],
    zIndex: [-1, 0, 1, 2, 3, 4, 5],
  },
  shorthands: {
    p: ["padding"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    m: ["margin"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    br: ["borderRadius"],
    size: ["width", "height"],
    minSize: ["minWidth", "minHeight"],
    maxSize: ["maxWidth", "maxHeight"],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  responsiveArray: ["lightMode", "darkMode"],
  properties: {
    color: colors,
    backgroundColor: colors,
    borderColor: colors,
  },
  shorthands: {
    bg: ["backgroundColor"],
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
