import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { useSendPhoneVerificationCodeMutation } from "src/graphql";
import { Box } from "src/ui/Box";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";
import { formatPhoneNumber } from "src/utils/formatPhoneNumber";

interface LoginPhoneInputProps {
  reRunTimer: () => void;
  setShowCertification: Dispatch<SetStateAction<boolean>>;
  start: () => void;
}

export const LoginPhoneInput = ({
  setShowCertification,
  reRunTimer,
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
    const limitedLength13Value = value.slice(0, 13);
    setphoneValue(limitedLength13Value);
    if (limitedLength13Value.length === 13) {
      setPostText("전송");
      return;
    }
    setPostText("");
  };

  const handleOnClearClick = () => {
    setphoneValue("");
  };

  const handleloginCertificationChildOnClick = () => {
    sendPhoneVerificationMutation({
      input: {
        phoneNumber: phoneValue.replaceAll("-", ""),
      },
    });
    if (postText === "전송") {
      setPostText("재전송");
      setShowCertification(true);
      start();
      return;
    }
    if (postText === "재전송") {
      reRunTimer();
    }
  };

  return (
    <Input
      pattern="\d*"
      placeholder="휴대폰 번호를 입력해주세요."
      rightNode={
        postText ? (
          <Box
            cursor="pointer"
            minWidth="fit"
            onClick={handleloginCertificationChildOnClick}
          >
            <Typography color="black2" fontSize="body3-m">
              {postText}
            </Typography>
          </Box>
        ) : undefined
      }
      size="large"
      state={phoneValue.length === 11 ? "valid" : undefined}
      type="tel"
      value={formatPhoneNumber(phoneValue)}
      variant="underline"
      onChange={handleOnChange}
      onClearClick={handleOnClearClick}
    />
  );
};
