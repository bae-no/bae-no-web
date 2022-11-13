import { AllHTMLAttributes, ComponentType } from "react";

import { m } from "framer-motion";

import { ExcludeObject } from "src/types/ExcludeObject";

import Box, { BoxProps } from "./Box";

export const MotionBox = m(
  Box as ComponentType<
    ExcludeObject<
      BoxProps,
      Omit<
        AllHTMLAttributes<HTMLElement>,
        "children" | "height" | "width" | "as"
      >
    >
  >,
);
