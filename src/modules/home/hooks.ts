import { useEffect, useRef, useState } from "react";

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
