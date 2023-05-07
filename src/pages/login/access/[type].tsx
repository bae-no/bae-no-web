import { useEffect } from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { AuthType, useSignInMutation } from "src/graphql";
import { UserAccessPermissionInfo } from "src/modules/Login/Acess/UserAccessPermissionInfo";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";
import { parseCookieOptions } from "src/utils/cookie";
import { addDate } from "src/utils/date";

type AuthProvider = "Kakao" | "Google" | "Apple";

const isAuthProvider = (arg: string): arg is AuthProvider =>
  ["Kakao", "Google", "Apple"].some((authProvider) => authProvider !== arg);

const AccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    Notification.requestPermission();
  }, [router.isReady]);

  const handleClick = () => {
    router.push("/login/verification");
  };
  return (
    <Box height="full" paddingBottom="48" px="16">
      <Box as="main" gap="32" height="full" justifyContent="center">
        <Typography as="h1" fontSize="headline3">
          배달비 노노에서 사용하는
          <br />
          접근권한을 알려드려요.
        </Typography>
        <UserAccessPermissionInfo />
      </Box>
      <Button onClick={handleClick}>확인</Button>
    </Box>
  );
};

export default AccessPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type, code } = context.query;
  if (!type)
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };

  try {
    const pascalMutationType = (type as string).replace(/^[a-z]/, (char) =>
      char.toUpperCase(),
    );

    if (isAuthProvider(pascalMutationType)) {
      const {
        signIn: { accessToken, hasProfile, isPhoneNumberVerified },
      } = await useSignInMutation.fetcher({
        input: {
          code: code as string,
          type: AuthType[pascalMutationType],
        },
      })();

      context.res.setHeader(
        "Set-Cookie",
        `token=${accessToken}; ${parseCookieOptions({
          expires: addDate(new Date(), 14),
          path: "/",
        })}`,
      );

      if (hasProfile && isPhoneNumberVerified)
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
    }
    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }
};
