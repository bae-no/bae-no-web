import { useEffect } from "react";

import { useRouter } from "next/router";

import { useSignInMutation, AuthType } from "src/graphql";
import { Content } from "src/modules/Login";
import { Typography, Box, Button } from "src/ui";
import { withGraphql } from "src/utils/graphql/withGraphql";

const Acess = () => {
  const {
    query: { acess, code },
    isReady,
  } = useRouter();
  const [acessMutationResult, acessMutation] = useSignInMutation();

  useEffect(() => {
    if (!isReady || typeof acess !== "string") return;
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
    });
  }, [acess, isReady, code, acessMutation]);
  if (typeof window !== "undefined" && acessMutationResult.data) {
    document.cookie = `token=${acessMutationResult.data.signIn.accessToken}`;
    localStorage.setItem("token", acessMutationResult.data.signIn.accessToken);
  }

  return (
    <Box height="full" paddingBottom="48" px="16">
      <Box as="main" gap="32" height="full" justifyContent="center">
        <Typography fontSize="headline3">
          배달비 노노에서 사용하는
          <br />
          접근권한을 알려드려요.
        </Typography>
        <Content />
      </Box>
      <Button>확인</Button>
    </Box>
  );
};

export default withGraphql(Acess);
