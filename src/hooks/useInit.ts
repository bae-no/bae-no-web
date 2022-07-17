import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useWindowSize } from './useWindowSize';

export const useInit = () => {
  const { height } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    if (!height) return;
    document.body.style.height = `${height / 10}rem`;
  }, [height]);
};
