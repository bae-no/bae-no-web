import { useEffect } from "react";

import { useSetReastorage } from "@reastorage/react";
import { useRouter } from "next/router";

import { useSignInMutation, AuthType } from "src/graphql";
import { UserAccessPermissionInfo } from "src/modules/Login/Acess/UserAccessPermissionInfo";
import { token } from "src/store/token";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";
import { withGraphql } from "src/utils/graphql/withGraphql";

type AuthProvider = "Kakao" | "Google" | "Apple";

const isAuthProvider = (arg: string): arg is AuthProvider =>
  ["Kakao", "Google", "Apple"].some((authProvider) => authProvider !== arg);

const Acess = () => {
  const router = useRouter();
  const { type, code } = router.query as { [key: string]: string };
  const [acessMutationResult, acessMutation] = useSignInMutation();
  const setAcessToken = useSetReastorage(token);

  useEffect(() => {
    if (!router.isReady) return;
    Notification.requestPermission();
    const pascalMutationType = type.replace(/^[a-z]/, (char) =>
      char.toUpperCase(),
    );
    if (isAuthProvider(pascalMutationType)) {
      acessMutation({
        input: {
          code,
          type: AuthType[pascalMutationType],
        },
      }).then(({ data }) => {
        if (data?.signIn.accessToken === undefined) return;
        setAcessToken(data?.signIn.accessToken);
        document.cookie = `token=${data?.signIn.accessToken}`;
      });
    }
  }, [type, acessMutation, code, router.isReady, setAcessToken]);

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
      <Button disabled={acessMutationResult.fetching} onClick={handleClick}>
        확인
      </Button>
    </Box>
  );
};

export default withGraphql(Acess);
