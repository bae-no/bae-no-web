import { ComponentProps, ReactNode, useRef } from "react";

import { LazyMotion, m, PanInfo } from "framer-motion";

import { useStateWithProp } from "src/hooks";

import { Box } from "../Box";
import { Sprinkles } from "../sprinkles.css";

import { barCss } from "./PullToClose.css";

const loadDomMax = () =>
  import("src/utils/framerDomMax").then((module) => module.default);

interface PullToCloseProps
  extends Pick<ComponentProps<typeof m.div>, "dragSnapToOrigin"> {
  barStyle?: Sprinkles;
  children: ReactNode;
  className?: string;
  onClose: VoidFunction;
  threshold?: number;
}

const THRESHOLD = 0.3;

/**
 * AnimatePresence와 함께 사용 권장
 */
const PullToClose = ({
  dragSnapToOrigin,
  onClose,
  className,
  children,
  barStyle,
  threshold = THRESHOLD,
}: PullToCloseProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [snapToOrigin, setSnapToOrigin] = useStateWithProp(dragSnapToOrigin);
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!ref.current) return;

    if (
      ref.current.getBoundingClientRect().height * threshold <
      info.offset.y
    ) {
      onClose();
    }
  };

  const handleDrag = (_: any, info: PanInfo) => {
    requestAnimationFrame(() => {
      if (!ref.current) return;
      if (
        ref.current.getBoundingClientRect().height * threshold <
        info.offset.y
      ) {
        setSnapToOrigin(false);
      } else {
        setSnapToOrigin(true);
      }
    });
  };

  return (
    <LazyMotion features={loadDomMax}>
      <m.div
        animate={{ y: "0%" }}
        className={className}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0}
        dragSnapToOrigin={snapToOrigin}
        exit={{ y: "100%" }}
        initial={{ y: "100%" }}
        ref={ref}
        transition={{
          duration: !snapToOrigin ? 0.1 : 0.2,
          type: "tween",
        }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <Box className={barCss} {...barStyle} />
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default PullToClose;
