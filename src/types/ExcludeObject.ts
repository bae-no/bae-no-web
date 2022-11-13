export type ExcludeObject<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: T[P];
};
