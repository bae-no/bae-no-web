import { useCallback, useRef } from "react";

import { MaybePromise } from "src/types";

type AnyFunctionReturnVoid = (...args: any[]) => MaybePromise<void>;

export const useDebouncedCallback = <T extends AnyFunctionReturnVoid>(
  callback: T,
  delay: number,
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};
