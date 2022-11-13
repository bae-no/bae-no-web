import { ReactNode } from "react";

import { LazyMotion } from "framer-motion";

const loadDomMax = () =>
  import("src/utils/framerDomMax").then((module) => module.default);
interface LazyDomMaxMotionProps {
  children: ReactNode;
}

const LazyDomMaxMotion = ({ children }: LazyDomMaxMotionProps) => (
  <LazyMotion features={loadDomMax}>{children}</LazyMotion>
);

export default LazyDomMaxMotion;
