import { useEffect } from "react";

import { getToken } from "src/utils";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useMounted } from "./useMounted";
import { useWindowSize } from "./useWindowSize";

export const useInit = () => {
  const mounted = useMounted();

  const { height } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    if (!height) return;
    document.body.style.height = `${height / 10}rem`;
  }, [height]);

  useEffect(() => {
    if (mounted) {
      getToken();
    }
  }, [mounted]);
};
