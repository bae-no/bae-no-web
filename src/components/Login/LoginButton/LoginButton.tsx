import { Button, Typography } from "src/ui";
import { ButtonProps } from "src/ui/Button/Button.type";

import { buttonCss } from "./loginButton.css";
import Apple from "./svgs/apple.svg";
import Google from "./svgs/google.svg";
import Kakao from "./svgs/kakao.svg";

const loginButtonObject = {
  apple: {
    icon: <Apple />,
    text: "Apple로 계속하기",
  },
  google: {
    icon: <Google />,
    text: "구글로 계속하기",
  },
  kakao: {
    icon: <Kakao />,
    text: "카카오톡으로 계속하기",
  },
};

interface LoginButtonProps extends Pick<ButtonProps, "onClick"> {
  loginType: "google" | "kakao" | "apple";
}

export const LoginButton = ({ loginType, onClick }: LoginButtonProps) => {
  const { icon, text } = loginButtonObject[loginType];
  return (
    <Button className={buttonCss({ type: loginType })} onClick={onClick}>
      {icon}
      <Typography as="span">{text}</Typography>
    </Button>
  );
};
