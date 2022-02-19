import { sprinkles, Sprinkles } from "./spakles.css";

export const parseProps = <T extends Record<string, any>>(props: T) => {
  const atomProps: Record<string, unknown> = {};
  const nativeProps: Record<string, unknown> = {};

  for (const key in props) {
    if (sprinkles.properties.has(key as keyof Sprinkles)) {
      atomProps[key] = props[key as keyof typeof props];
    } else {
      nativeProps[key] = props[key as keyof typeof props];
    }
  }
  return [atomProps, nativeProps];
};
