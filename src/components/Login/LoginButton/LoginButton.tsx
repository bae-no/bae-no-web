import { Button, Typography } from "src/ui";
import { ButtonProps } from "src/ui/Button/Button.type";

import { buttonCss } from "./loginButton.css";
import { loginButtonObject } from "./loginButtonObject";

interface LoginButtonProps extends Pick<ButtonProps, "onClick"> {
  loginType: "google" | "kakao" | "apple";
}

export const LoginButton = ({ loginType, onClick }: LoginButtonProps) => (
  <Button className={buttonCss({ type: loginType })} onClick={onClick}>
    {loginButtonObject[loginType].icon}
    <Typography>{loginButtonObject[loginType].text}</Typography>
  </Button>
);
