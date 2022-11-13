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

type VerificationStateObject = {
  [key in "initial" | "invalid" | "valid"]: {
    color: "black5" | "danger1";
    inputState?: "valid" | "invalid";
    text?: string;
  };
};

const verificationStateObject = (
  timeState: TimeState,
): VerificationStateObject => ({
  initial: {
    color: "black5",
    inputState: undefined,
    text: "인증번호가 전송되었습니다.",
  },
  invalid: {
    color: "danger1",
    inputState: "invalid",
    text:
      timeState === "end"
        ? "인증시간을 초과하였습다. 재인증을 시도해주세요."
        : "인증 번호가 잘못되었습니다. 다시 한 번 확인해주세요.",
  },
  valid: {
    color: "black5",
    inputState: "valid",
  },
});

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

  const { initial, valid, invalid } = verificationStateObject(timeState);

  const [verificationState, setVerificationState] = useState(initial);

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
      setVerificationState(initial);
      setButtonDisabled(true);
      return;
    }

    if (
      (timeState === "end" && !isVerificationSuccess) ||
      (isVerificationError && timeState !== "end")
    ) {
      setVerificationState(invalid);
      setButtonDisabled(true);
      return;
    }
    if (isVerificationSuccess) {
      setVerificationState(valid);
      setButtonDisabled(false);
    }
  }, [
    initial,
    invalid,
    isVerificationError,
    isVerificationSuccess,
    setButtonDisabled,
    time,
    timeState,
    valid,
  ]);

  return (
    <Box gap="8">
      <FormField
        defaultMessage="인증번호가 전송되었습니다."
        fontSize="body1-m"
        gap="8"
        invalidMessage={verificationState.text}
        state={verificationState.inputState}
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
          state={verificationState.inputState}
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
