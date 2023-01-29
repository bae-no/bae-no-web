import {
  cloneElement,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
} from "react";

export interface IntersectionAreaProps {
  children: ReactElement<{ ref: RefObject<HTMLElement> }>;
  onIntersect: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
}

export const IntersectionArea = ({
  children,
  onIntersect,
  options,
}: IntersectionAreaProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onIntersect, options]);

  return cloneElement(children, { ref });
};
