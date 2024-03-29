/* eslint-disable react/no-array-index-key */
import { m } from "framer-motion";

import LazyDomMaxMotion from "src/components/LazyDomMaxMotion";
import { Box } from "src/ui/Box";

import { stepIndicatorCss } from "./StepIndicator.css";

interface StepIndicatorProps {
  step: number;
  totalSteps: number;
}
const StepIndicator = ({ step, totalSteps }: StepIndicatorProps) => (
  <LazyDomMaxMotion>
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
  </LazyDomMaxMotion>
);

export default StepIndicator;
