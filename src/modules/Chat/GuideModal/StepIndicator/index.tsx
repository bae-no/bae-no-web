/* eslint-disable react/no-array-index-key */
import { LazyMotion, m } from "framer-motion";

import { Box } from "src/ui/Box";

import { stepIndicatorCss } from "./StepIndicator.css";

const loadDomMax = () =>
  import("src/utils/framerDomMax").then((module) => module.default);

interface StepIndicatorProps {
  step: number;
  totalSteps: number;
}
const StepIndicator = ({ step, totalSteps }: StepIndicatorProps) => (
  <LazyMotion features={loadDomMax}>
    <Box direction="row" gap="8">
      {Array.from({ length: totalSteps }).map((_, index) =>
        index === step ? (
          <m.span
            className={stepIndicatorCss({ active: true })}
            key={index}
            layoutId="step-indicator"
          />
        ) : (
          <span className={stepIndicatorCss({ active: false })} key={index} />
        ),
      )}
    </Box>
  </LazyMotion>
);

export default StepIndicator;
