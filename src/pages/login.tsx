import { LoginButton } from "src/modules/Login/LoginButton/LoginButton";
import { loginCss } from "src/pageStyle/login/login.css";
import dynamic from "next/dynamic";
import { Box } from "src/ui";

const Animation = dynamic(() =>
  import("../modules/Login/LoginAnimation").then((data) => data.LoginAnimation),
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
    <Animation />
    <Box gap="12" width="full">
      <LoginButton loginType="google" />
      <LoginButton loginType="kakao" />
      <LoginButton loginType="apple" />
    </Box>
  </Box>
);

export default Login;
