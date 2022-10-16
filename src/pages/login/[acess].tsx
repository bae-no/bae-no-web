import { useEffect } from "react";

import { useRouter } from "next/router";

import { useSignInMutation, AuthType } from "src/graphql";
import { UserAccessPermissionInfo } from "src/modules/Login/Acess/UserAccessPermissionInfo";
import { Typography, Box, Button } from "src/ui";
import { withGraphql } from "src/utils/graphql/withGraphql";

const Acess = () => {
  const router = useRouter();
  const { acess, code } = router.query;
  const [acessMutationResult, acessMutation] = useSignInMutation();

  useEffect(() => {
    if (!router.isReady || typeof acess !== "string") return;
    Notification.requestPermission();
    const pascalMutationType = acess.replace(/^[a-z]/, (char) =>
      char.toUpperCase(),
    );
    if (
      typeof code !== "string" ||
      pascalMutationType !== ("Kakao" || "Google" || "Apple")
    )
      return;
    acessMutation({
      input: {
        code,
        type: AuthType[pascalMutationType],
      },
    }).then(({ data }) => {
      if (data?.signIn.accessToken === undefined) return;
      document.cookie = `token=${data?.signIn.accessToken}`;
      localStorage.setItem("token", data?.signIn.accessToken);
    });
  }, [acess, router.isReady, code, acessMutation]);

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
