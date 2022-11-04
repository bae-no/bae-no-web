import { ReactElement, ReactNode, Suspense } from "react";

import { useMounted } from "src/hooks/useMounted";

interface SSRSafeSuspenseProps {
  children: ReactNode;
  fallback: ReactElement;
}

const SSRSafeSuspense = ({ children, fallback }: SSRSafeSuspenseProps) => {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }
  return fallback;
};

export default SSRSafeSuspense;
