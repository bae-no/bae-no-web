import { useState, ChangeEvent, useEffect } from "react";

import { useSetReastorage } from "@reastorage/react";

import { useHasAlreadyNicknameQuery } from "src/graphql";
import { pageMarginTop136 } from "src/pageStyle/login/common.css";
import { nickNameStorage } from "src/store/nickName";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

const NO_SPACE_STRING = /(\s*)/g;
const MIN_NICKNAME = 2;

const verifiedStateObject = {
  initial: {
    color: "black4",
    inputState: undefined,
    text: "닉네임을 설정하시면 추후 수정이 불가합니다.",
  },
  invalid: {
    color: "danger1",
    inputState: "invalid",
    text: "이미 사용중인 닉네임입니다.",
  },
  valid: {
    color: "success1",
    inputState: "valid",
    text: "사용하실 수 있는 닉네임입니다.",
  },
} as const;

const NickName = () => {
  const setNickNameStorage = useSetReastorage(nickNameStorage);
  const [inputValue, setInputValue] = useState("");
  const [queryPause, setQueryPause] = useState(true);
  const [verifiedState, setVerifiedState] =
    useState<keyof typeof verifiedStateObject>("initial");

  const { isFetching, data } = useHasAlreadyNicknameQuery(
    {
      nickname: inputValue,
    },
    {
      enabled: !queryPause,
      suspense: false,
    },
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const noSpaceInputValue = value.replace(NO_SPACE_STRING, "");

    setInputValue(noSpaceInputValue);
    if (noSpaceInputValue.length > MIN_NICKNAME) {
      setQueryPause(false);
      return;
    }
    setQueryPause(true);
  };

  const handleOnClearClick = () => {
    setInputValue("");
  };

  useEffect(() => {
    if (data === undefined || inputValue.length <= MIN_NICKNAME) {
      setVerifiedState("initial");
      return;
    }
    const { hasNickname } = data;

    if (hasNickname) {
      setVerifiedState("invalid");
    }
    setVerifiedState("valid");
  }, [data, inputValue.length]);

  const handleNextpage = () => {
    setNickNameStorage(inputValue);
    // 다음페이지로 route
  };
  return (
    <Box
      className={pageMarginTop136}
      height="full"
      justifyContent="space-between"
      marginBottom="48"
      px="16"
    >
      <Box gap="40">
        <Typography as="h1" fontSize="headline2">
          배달비 노노에서 사용할 닉네임을 입력해주세요.
        </Typography>
        <Box gap="8">
          <Input
            placeholder="닉네임을 입력해주세요."
            state={verifiedStateObject[verifiedState].inputState}
            value={inputValue}
            variant="underline"
            onChange={handleOnChange}
            onClearClick={handleOnClearClick}
          />
          <Typography
            as="span"
            color={verifiedStateObject[verifiedState].color}
            fontSize="caption1-m"
          >
            {verifiedStateObject[verifiedState].text}
          </Typography>
        </Box>
      </Box>
      <Button
        disabled={verifiedState !== "valid" || isFetching}
        onClick={handleNextpage}
      >
        확인
      </Button>
    </Box>
  );
};

export default NickName;
