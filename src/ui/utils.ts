import { sprinkles, Sprinkles } from "./sprinkles.css";

type ParsePropReturn<T> = [
  Partial<Sprinkles>,
  Partial<Omit<T, keyof Sprinkles>>
];

export const parseProps = <T extends Record<string, any>>(props: T) => {
  const atomProps: Record<string, unknown> = {};
  const nativeProps: Record<string, unknown> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (sprinkles.properties.has(key as keyof Sprinkles)) {
      atomProps[key] = value;
    } else {
      nativeProps[key] = value;
    }
  });

  return [atomProps, nativeProps] as ParsePropReturn<T>;
};
