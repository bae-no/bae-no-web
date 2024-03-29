import { useState } from "react";

import { useRouter } from "next/router";

import { useTimer } from "src/hooks/useTimer";
import { LoginPhoneInput } from "src/modules/Login/verification/LoginPhoneInput";
import { LoginVerificationInput } from "src/modules/Login/verification/LoginverificationInput";
import { pageMarginTop136 } from "src/pageStyle/login/common.css";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";

const WAITTING = 160000;

const Verification = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();
  const { time, reRunTimer, start, timeState } = useTimer(WAITTING);

  return (
    <Box
      className={pageMarginTop136}
      height="full"
      justifyContent="space-between"
      paddingBottom="48"
      px="16"
      width="full"
    >
      <Box gap="32">
        <Typography as="h1" fontSize="headline2">
          서비스 이용을 위해
          <br /> 인증을 진행해 주세요.
        </Typography>
        <Box as="main" gap="8">
          <LoginPhoneInput
            reRunTimer={reRunTimer}
            setShowCertification={setShowVerification}
            start={start}
          />
          {showVerification ? (
            <LoginVerificationInput
              setButtonDisabled={setButtonDisabled}
              time={time}
              timeState={timeState}
            />
          ) : (
            <Typography color="black4" fontSize="caption1-m">
              타인의 개인정보를 도용하여 가입한 경우, 서비스 이용 제한 및 법적
              제재를 받으실 수 있습니다.
            </Typography>
          )}
        </Box>
      </Box>
      <Box as="footer" bottom="48">
        <Button
          disabled={buttonDisabled}
          onClick={() => router.push("/login/nick-name")}
        >
          확인
        </Button>
      </Box>
    </Box>
  );
};

export default Verification;
