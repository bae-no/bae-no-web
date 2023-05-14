import { useRouter } from "next/router";

import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";

import { buttonCss } from "./loginButton.css";
import Google from "./svgs/google.svg";
import Kakao from "./svgs/kakao.svg";

const loginButtonObject = {
  google: {
    icon: <Google />,
    text: "구글로 계속하기",
    url: `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_DEVELOPMENT_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DEVELOPMENT_DEFAULT_URL}/login/access/google&response_type=code&scope=openid`,
  },
  kakao: {
    icon: <Kakao />,
    text: "카카오톡으로 계속하기",
    url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_DEVELOPMENT_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DEVELOPMENT_DEFAULT_URL}/login/access/kakao`,
  },
};

interface LoginButtonProps {
  loginType: "google" | "kakao";
}

export const LoginButton = ({ loginType }: LoginButtonProps) => {
  const { icon, text, url } = loginButtonObject[loginType];
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    <Button className={buttonCss({ type: loginType })} onClick={handleClick}>
      {icon}
      <Typography as="span">{text}</Typography>
    </Button>
  );
};
