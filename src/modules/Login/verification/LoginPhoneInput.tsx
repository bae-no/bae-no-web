import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useSendPhoneVerificationCodeMutation } from "src/graphql";
import { Box } from "src/ui/Box";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

interface LoginPhoneInputProps {
  reTimer: () => void;
  setShowCertification: Dispatch<SetStateAction<boolean>>;
  start: () => void;
}

const REGEXP_NUMBER = /[^0-9]/;

export const LoginPhoneInput = ({
  setShowCertification,
  reTimer,
  start,
}: LoginPhoneInputProps) => {
  const [phoneValue, setphoneValue] = useState("");
  const [postText, setPostText] = useState("");
  const [, sendPhoneVerificationMutation] =
    useSendPhoneVerificationCodeMutation();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (REGEXP_NUMBER.test(value)) return;
    setphoneValue(value.slice(0, 11));
  };
  useEffect(() => {
    if (phoneValue.length !== 11) return;
    setPostText("전송");
  }, [phoneValue]);

  const handleOnClearClick = () => {
    setphoneValue("");
  };
  const handleloginCertificationChildOnClick = () => {
    sendPhoneVerificationMutation({
      input: {
        phoneNumber: phoneValue,
      },
    });
    if (postText === "전송") {
      setPostText("재전송");
      setShowCertification(true);
      start();
      return;
    }
    if (postText === "재전송") {
      reTimer();
    }
  };

  return (
    <Input
      pattern="\d*"
      placeholder="휴대폰 번호를 입력해주세요."
      rightNode={
        <Box
          cursor="pointer"
          minWidth="fit"
          onClick={handleloginCertificationChildOnClick}
        >
          <Typography color="black2" fontSize="body3-m">
            {postText}
          </Typography>
        </Box>
      }
      size="large"
      state={phoneValue.length === 11 ? "valid" : undefined}
      type="tel"
      value={phoneValue}
      variant="underline"
      onChange={handleOnChange}
      onClearClick={handleOnClearClick}
    />
  );
};
