type PropsRecord = Record<string, any>;

type MakeConditionalProps<
  TFirst extends PropsRecord,
  TSecond extends PropsRecord,
> = {
  [K in keyof TFirst]: TFirst[K];
} & {
  [K in keyof TSecond]?: undefined;
};

export type ConditionalProps<
  TFirst extends PropsRecord,
  TSecond extends PropsRecord,
> =
  | MakeConditionalProps<TFirst, TSecond>
  | MakeConditionalProps<TSecond, TFirst>;
