import { useEffect } from "react";

import { useRouter } from "next/router";
import { useMutation, graphql } from "react-relay";

import { Content } from "src/modules/Login";
import { Typography, Box, Button } from "src/ui";

const Acess = () => {
  const route = useRouter();
  const [commit] = useMutation(graphql`
    mutation acessMutation($input: SignInInput!) {
      signIn(input: $input) {
        accessToken
      }
    }
  `);

  useEffect(() => {
    if (!route.isReady) return;
    Notification.requestPermission();
    if (typeof window === "undefined") return;
    const type =
      typeof route.query.acess === "string"
        ? route.query.acess.toUpperCase()
        : "";
    commit({
      variables: {
        input: {
          code: route.query.code,
          type,
        },
      },
    });
  }, [route, commit]);

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

export default Acess;
