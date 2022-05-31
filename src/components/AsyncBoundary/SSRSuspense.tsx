import { ReactElement, ReactNode, Suspense } from "react";
import { useMounted } from "src/hooks";

interface SSRSafeSuspenseProps {
  fallback: ReactElement;
  children: ReactNode;
}

const SSRSafeSuspense = ({ children, fallback }: SSRSafeSuspenseProps) => {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }
  return fallback;
};

export default SSRSafeSuspense;
