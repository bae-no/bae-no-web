import { useEffect } from "react";

import { useSetReastorage } from "@reastorage/react";
import { useRouter } from "next/router";

import { useSignInMutation, AuthType } from "src/graphql";
import { UserAccessPermissionInfo } from "src/modules/Login/Acess/UserAccessPermissionInfo";
import { tokenStorage } from "src/store/token";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";

type AuthProvider = "Kakao" | "Google" | "Apple";

const isAuthProvider = (arg: string): arg is AuthProvider =>
  ["Kakao", "Google", "Apple"].some((authProvider) => authProvider !== arg);

const AccessPage = () => {
  const router = useRouter();
  const { type, code } = router.query as { [key: string]: string };
  const setAccessToken = useSetReastorage(tokenStorage);
  const { mutate, isLoading } = useSignInMutation({
    onSuccess: (data) => {
      if (data?.signIn.accessToken === undefined) return;
      setAccessToken(data?.signIn.accessToken);
      document.cookie = `token=${data?.signIn.accessToken}`;
    },
  });

  useEffect(() => {
    if (!router.isReady) return;
    Notification.requestPermission();
    const pascalMutationType = type.replace(/^[a-z]/, (char) =>
      char.toUpperCase(),
    );
    if (isAuthProvider(pascalMutationType)) {
      mutate({
        input: {
          code,
          type: AuthType[pascalMutationType],
        },
      });
    }
  }, [type, mutate, code, router.isReady]);

  const handleClick = () => {
    router.push("verification");
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
      <Button disabled={isLoading} onClick={handleClick}>
        확인
      </Button>
    </Box>
  );
};

export default AccessPage;
