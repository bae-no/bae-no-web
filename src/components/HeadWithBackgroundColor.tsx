import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";

import { Box } from "src/ui/Box";
import { Sprinkles } from "src/ui/sprinkles.css";

const HEADER_HEIGHT = 60;

export const useHeaderBackgroundColor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState<"orange6" | "white">("orange6");

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        const { offsetHeight, offsetTop } = ref.current;
        const { scrollY } = window;

        const isOverThreshold =
          scrollY > offsetTop + offsetHeight - HEADER_HEIGHT;

        if (isOverThreshold && color !== "white") {
          setColor("white");
        } else if (!isOverThreshold && color !== "orange6") {
          setColor("orange6");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [color]);

  return [ref, color] as const;
};

interface HeadWithBackgroundColorProps {
  children: ReactNode;
  css?: Sprinkles;
}

export const HeadWithBackgroundColor = forwardRef<
  HTMLDivElement,
  HeadWithBackgroundColorProps
>(({ children, css }, ref) => (
  <Box {...css} position="relative" ref={ref}>
    <Box backgroundColor="orange6" inset="0" position="absolute" zIndex={-1} />
    {children}
  </Box>
));
