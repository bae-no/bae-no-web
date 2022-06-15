import { ErrorBoundary } from "react-error-boundary";

import { AsyncBoundaryProps } from "./interfaces";
import SSRSafeSuspense from "./SSRSuspense";

export const AsyncBoundary = ({
  children,
  loadingFallback: LoadingComponent,
  errorFallback,
  ...rest
}: AsyncBoundaryProps) => (
  <ErrorBoundary {...rest} FallbackComponent={errorFallback}>
    <SSRSafeSuspense fallback={LoadingComponent && <LoadingComponent />}>
      {children}
    </SSRSafeSuspense>
  </ErrorBoundary>
);
