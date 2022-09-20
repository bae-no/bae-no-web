import { Button, Typography } from "src/ui";

import { buttonCss } from "./loginButton.css";
import Apple from "./svgs/apple.svg";
import Google from "./svgs/google.svg";
import Kakao from "./svgs/kakao.svg";

const loginButtonObject = {
  apple: {
    icon: <Apple />,
    text: "Apple로 계속하기",
    url: "여기는 나중에 배포전에 만들부분입니다.",
  },
  google: {
    icon: <Google />,
    text: "구글로 계속하기",
    url: `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_DEVELOPMENT_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DEVELOPMENT_DEFAULT_URL}/login/acess&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`,
  },
  kakao: {
    icon: <Kakao />,
    text: "카카오톡으로 계속하기",
    url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_DEVELOPMENT_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DEVELOPMENT_DEFAULT_URL}/login/kakao`,
  },
};

interface LoginButtonProps {
  loginType: "google" | "kakao" | "apple";
}

export const LoginButton = ({ loginType }: LoginButtonProps) => {
  const { icon, text, url } = loginButtonObject[loginType];

  return (
    <Button className={buttonCss({ type: loginType })} href={`${url}`}>
      {icon}
      <Typography as="span">{text}</Typography>
    </Button>
  );
};
