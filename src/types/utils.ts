export type InferArray<T extends Array<unknown>> = T extends Array<infer R>
  ? R
  : never;

export type MaybePromise<T> = T | Promise<T>;
