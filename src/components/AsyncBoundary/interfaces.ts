import { ComponentProps, ReactElement, ReactNode } from "react";

import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

export interface AsyncBoundaryProps
  extends Omit<
    ErrorBoundaryProps,
    "fallback" | "FallbackComponent" | "fallbackRender"
  > {
  children: ReactNode;
  errorFallback: Required<
    ComponentProps<typeof ErrorBoundary>
  >["FallbackComponent"];
  loadingFallback: (props?: unknown) => ReactElement<typeof props>;
}
