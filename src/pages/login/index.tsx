import dynamic from "next/dynamic";

import { LoginButton } from "src/modules/Login/LoginButton/LoginButton";
import { loginCss } from "src/pageStyle/login/login.css";
import { Box } from "src/ui/Box";

const LoginAnimation = dynamic(
  () => import("../../modules/Login/LoginAnimation"),
);
const Login = () => (
  <Box
    alignItems="center"
    className={loginCss}
    height="full"
    justifyContent="space-between"
    px="16"
    width="full"
  >
    <LoginAnimation />
    <Box gap="12" width="full">
      <LoginButton loginType="google" />
      <LoginButton loginType="kakao" />
    </Box>
  </Box>
);

export default Login;
