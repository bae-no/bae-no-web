import { ReactNode } from "react";

import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";

import Lottie from "src/components/Lottie";
import { Box, Typography } from "src/ui";

import { stepContainerCss } from "./StepBase.css";

interface StepBaseProps {
  dangerText?: string;
  description: ReactNode;
  lottieAnimation: any;
  title: string;
}

const StepBase = ({
  title,
  description,
  lottieAnimation,
  dangerText,
}: StepBaseProps) => (
  <Box className={stepContainerCss} gap="16">
    <AlertDialogTitle asChild>
      <Typography as="h2" fontSize="headline4" textAlign="center">
        {title}
      </Typography>
    </AlertDialogTitle>
    <AlertDialogDescription asChild>
      <Box gap="16">
        <Lottie autoplay loop animationData={lottieAnimation} />
        <Box gap="4">
          <Typography
            as="p"
            color="black2"
            fontSize="body2-m"
            textAlign="center"
          >
            {description}
          </Typography>
          {dangerText && (
            <Typography
              as="strong"
              color="danger1"
              fontSize="body3-m"
              textAlign="center"
            >
              {dangerText}
            </Typography>
          )}
        </Box>
      </Box>
    </AlertDialogDescription>
  </Box>
);

export default StepBase;
