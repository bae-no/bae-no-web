import { ReactNode } from "react";

interface ConditionalRenderProps<
  T extends boolean | string | null | undefined,
> {
  condition: T;
  renderCase: {
    [key in T extends boolean
      ? "true" | "false"
      : T extends null
      ? "null"
      : T extends undefined
      ? "undefined"
      : T]?: ReactNode;
  };
}

export const ConditionalRender = <
  T extends boolean | string | null | undefined,
>({
  condition,
  renderCase,
}: ConditionalRenderProps<T>) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{renderCase[condition as keyof typeof renderCase] ?? null}</>
);
