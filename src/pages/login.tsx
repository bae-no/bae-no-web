import { useEffect, useRef } from "react";

import Lottie from "lottie-web";

import { LoginButton } from "src/components/Login/LoginButton/LoginButton";
import { loginCss } from "src/pageStyle/login/login.css";
import { Box } from "src/ui";

import loginIconAnimation from "../components/Login/loginIconAnimation.json";

const Login = () => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current !== undefined) {
      Lottie.loadAnimation({
        animationData: loginIconAnimation,
        container: ref.current,
      });
    }
  }, []);
  return (
    <Box
      alignItems="center"
      className={loginCss}
      height="full"
      justifyContent="space-between"
      px="16"
      width="full"
    >
      <Box justifyContent="center" maxHeight="half" ref={ref} />
      <Box gap="12" width="full">
        <LoginButton loginType="google" />
        <LoginButton loginType="kakao" />
        <LoginButton loginType="apple" />
      </Box>
    </Box>
  );
};

export default Login;
