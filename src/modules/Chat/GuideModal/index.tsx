import { ReactNode, startTransition, useState } from "react";

import * as AlertDialogPrimitives from "@radix-ui/react-alert-dialog";
import { reastorage, useSetReastorage } from "@reastorage/react";
import dynamic from "next/dynamic";

import { useToggle } from "src/hooks/useToggle";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { CheckBox } from "src/ui/CheckBox";
import { AlertDialogContent } from "src/ui/Popup/Contents";

import StepIndicator from "./StepIndicator";
import Step1 from "./steps/Step1";

export const guideStorage = reastorage("neverShowGuideAgain", false);

const STEP_MAP = [
  Step1,
  dynamic(() => import("./steps/Step2"), { suspense: true }),
  dynamic(() => import("./steps/Step3"), { suspense: true }),
  dynamic(() => import("./steps/Step4"), { suspense: true }),
  dynamic(() => import("./steps/Step5"), { suspense: true }),
] as const;

const TOTAL_STEPS = STEP_MAP.length;

interface GuideModalProps
  extends Pick<AlertDialogPrimitives.AlertDialogProps, "defaultOpen"> {
  closeCallback?: () => void;
  trigger: ReactNode;
}

const GuideModal = ({
  defaultOpen,
  trigger,
  closeCallback,
}: GuideModalProps) => {
  const setNeverShowAgain = useSetReastorage(guideStorage);
  const [step, setStep] = useState(0);
  const StepComponent = STEP_MAP[step];

  const isLastStep = TOTAL_STEPS - 1 <= step;

  const handleStepChange = (stepChangeAmount: 1 | -1) => () => {
    startTransition(() => {
      setStep((prevStep) => {
        const nextStep = prevStep + stepChangeAmount;
        return nextStep < 0 || nextStep >= TOTAL_STEPS ? prevStep : nextStep;
      });
    });
  };

  const [showAgainChecked, toggleShowAgainChecked] = useToggle(false);

  const handleClose = () => {
    if (showAgainChecked) setNeverShowAgain(true);
    if (closeCallback) closeCallback();
  };

  return (
    <AlertDialogPrimitives.Root defaultOpen={defaultOpen}>
      <AlertDialogPrimitives.Trigger asChild>
        {trigger}
      </AlertDialogPrimitives.Trigger>
      <AlertDialogContent>
        <Box align="center">
          <>
            <StepComponent />
            <StepIndicator step={step} totalSteps={TOTAL_STEPS} />
          </>
        </Box>
        <Box direction="row" gap="16" marginBottom="8" marginTop="16">
          {step > 0 && (
            <Button color="white" onClick={handleStepChange(-1)}>
              이전
            </Button>
          )}
          {isLastStep ? (
            <AlertDialogPrimitives.AlertDialogAction asChild>
              <Button onClick={handleClose}>완료</Button>
            </AlertDialogPrimitives.AlertDialogAction>
          ) : (
            <Button onClick={handleStepChange(1)}>다음</Button>
          )}
        </Box>
        <CheckBox
          label="다시 보지 않기"
          onCheckedChange={toggleShowAgainChecked}
        />
      </AlertDialogContent>
    </AlertDialogPrimitives.Root>
  );
};

export default GuideModal;
