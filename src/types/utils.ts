export type InferArray<T extends Array<unknown>> = T extends Array<infer R>
  ? R
  : never;
