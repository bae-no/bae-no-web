import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useVerifyPhoneVerificationCodeMutation } from "src/graphql";
import { useDebouncedCallback } from "src/hooks/useDebouncedCallback";
import { Box } from "src/ui/Box";
import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

const WAITTING = 160000;
const REGEXP_NUMBER = /[^0-9]/;

interface LoginverificationProps {
  isEnd: boolean;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
  time: number;
}

interface DescriptionState {
  color?: "black5" | "danger1";
  inputState?: "valid" | "invalid";
}

export const LoginVerificationInput = ({
  setButtonDisabled,
  isEnd,
  time,
}: LoginverificationProps) => {
  const [inputValue, setInputValue] = useState("");
  const minute = Math.floor(time / 60000);
  const second = Math.floor(time % 60000) / 1000;

  const [verificationResult, verificationMutation] =
    useVerifyPhoneVerificationCodeMutation();
  const [descriptionText, setDescriptionText] =
    useState("인증번호가 전송되었습니다.");
  const [descriptionState, setDescriptionState] = useState<DescriptionState>({
    color: "black5",
    inputState: undefined,
  });

  const isVerificationSuccess =
    verificationResult.data?.verifyPhoneVerificationCode;

  const isVerificationError = verificationResult.error;

  const callback = (verificationValue: string) => {
    verificationMutation({
      input: {
        code: verificationValue,
      },
    });
  };

  const deboundedCallback = useDebouncedCallback(callback, 500);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (REGEXP_NUMBER.test(value) || isVerificationSuccess) return;
    setInputValue(value.slice(0, 4));
    deboundedCallback(value.slice(0, 4));
  };

  const handleOnClearClick = () => {
    setInputValue("");
  };

  useEffect(() => {
    if (time === WAITTING) {
      setDescriptionText("인증번호가 전송되었습니다.");
      setDescriptionState({
        color: "black5",
        inputState: undefined,
      });
      setButtonDisabled(true);
      return;
    }

    if (isEnd && !isVerificationSuccess) {
      setDescriptionText("인증시간을 초과하였습다. 재인증을 시도해주세요.");
      setDescriptionState({
        color: "danger1",
        inputState: "invalid",
      });
      setButtonDisabled(true);
      return;
    }
    if (isVerificationError && !isEnd) {
      setDescriptionText(
        "인증 번호가 잘못되었습니다. 다시 한 번 확인해주세요.",
      );
      setDescriptionState({
        color: "danger1",
        inputState: "invalid",
      });
      setButtonDisabled(true);
      return;
    }
    if (isVerificationSuccess) {
      setDescriptionState({
        color: "black5",
        inputState: "valid",
      });
      setDescriptionText("");
      setButtonDisabled(false);
    }
  }, [
    isEnd,
    isVerificationError,
    isVerificationSuccess,
    setButtonDisabled,
    time,
    verificationResult.data,
  ]);

  return (
    <Box gap="8">
      <FormField
        state={descriptionState.inputState}
        invalidMessage={descriptionText}
        validMessage=" "
        fontSize="body1-m"
        defaultMessage="인증번호가 전송되었습니다."
        Suffix={
          <Typography color="danger1" fontSize="caption1-m">
            {!verificationResult.data?.verifyPhoneVerificationCode && time !== 0
              ? `${minute}분 ${second}초`
              : ""}
          </Typography>
        }
      >
        <Input
          placeholder="인증번호 4자리를 입력해주세요."
          size="large"
          state={descriptionState.inputState}
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
