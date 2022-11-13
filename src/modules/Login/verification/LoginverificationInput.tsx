import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useVerifyPhoneVerificationCodeMutation } from "src/graphql";
import { useDebouncedCallback } from "src/hooks/useDebouncedCallback";
import { TimeState } from "src/hooks/useTimer";
import { Box } from "src/ui/Box";
import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

const WAITTING = 160000;
const REGEXP_NUMBER = /[^0-9]/;

interface LoginverificationProps {
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
  time: number;
  timeState: TimeState;
}

const verificationStateObject = {
  initial: {
    inputState: undefined,
    text: "인증번호가 전송되었습니다.",
  },
  invalid: {
    inputState: "invalid",
    text: "인증 번호가 잘못되었습니다. 다시 한 번 확인해주세요.",
  },
  timeOver: {
    inputState: "invalid",
    text: "인증시간을 초과하였습다. 재인증을 시도해주세요.",
  },
  valid: {
    inputState: "valid",
    text: "",
  },
} as const;

export const LoginVerificationInput = ({
  setButtonDisabled,
  timeState,
  time,
}: LoginverificationProps) => {
  const [inputValue, setInputValue] = useState("");
  const minute = Math.floor(time / 60000);
  const second = Math.floor(time % 60000) / 1000;

  const [verificationResult, verificationMutation] =
    useVerifyPhoneVerificationCodeMutation();

  const [verificationState, setVerificationState] =
    useState<keyof typeof verificationStateObject>("initial");
  const { text, inputState } = verificationStateObject[verificationState];

  const isVerificationSuccess =
    verificationResult.data?.verifyPhoneVerificationCode;

  const isVerificationError = verificationResult.error;

  const sendVerification = useDebouncedCallback((verificationValue: string) => {
    verificationMutation({
      input: {
        code: verificationValue,
      },
    });
  }, 500);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (REGEXP_NUMBER.test(value) || isVerificationSuccess) return;
    setInputValue(value.slice(0, 4));
    sendVerification(value.slice(0, 4));
  };

  const handleOnClearClick = () => {
    setInputValue("");
  };

  useEffect(() => {
    if (time === WAITTING) {
      setVerificationState("initial");
      setInputValue("");
      setButtonDisabled(true);
      return;
    }

    if (timeState === "end" && !isVerificationSuccess) {
      setVerificationState("timeOver");
      setButtonDisabled(true);
      return;
    }
    if (isVerificationError && timeState !== "end") {
      setVerificationState("invalid");
    }

    if (isVerificationSuccess) {
      setVerificationState("valid");
      setButtonDisabled(false);
    }
  }, [
    isVerificationError,
    isVerificationSuccess,
    setButtonDisabled,
    time,
    timeState,
  ]);

  return (
    <Box gap="8">
      <FormField
        defaultMessage={verificationStateObject.initial.text}
        fontSize="body1-m"
        gap="8"
        invalidMessage={text}
        state={inputState}
        suffix={
          <Typography color="danger1" fontSize="caption1-m">
            {!verificationResult.data?.verifyPhoneVerificationCode && time !== 0
              ? `${minute}분 ${second}초`
              : ""}
          </Typography>
        }
        validMessage=" "
      >
        <Input
          placeholder="인증번호 4자리를 입력해주세요."
          size="large"
          state={inputState}
          type="tel"
          value={inputValue}
          variant="underline"
          onChange={handleOnChange}
          onClearClick={handleOnClearClick}
        />
      </FormField>
    </Box>
  );
};
