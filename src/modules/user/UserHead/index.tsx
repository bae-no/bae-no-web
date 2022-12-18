import Link from "next/link";

import { useUserProfileQuery } from "src/graphql";
import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

import Character from "./character.svg";

const UserHead = () => {
  const { data } = useUserProfileQuery();
  const { myEndDealCount, profile } = data ?? {};
  const { nickname } = profile ?? {};
  return (
    <Container gap="16">
      <Box
        align="center"
        as={Link}
        flexDirection="row"
        href="/user/profile"
        justify="space-between"
      >
        <Box align="center" as="span" flexDirection="row" gap="16">
          <Avatar size="56" text={nickname?.[0]} />
          <Typography as="h2" color="black1" fontSize="headline4">
            {nickname}
          </Typography>
        </Box>
        <Icon color="black7" name="arrow-right" size="16" />
      </Box>
      <Box
        backgroundColor="white"
        borderColor="black7"
        borderRadius="8"
        borderStyle="solid"
        borderWidth="1"
        height="48"
        justify="center"
        position="relative"
        px="16"
      >
        <Typography as="span" fontSize="body2-m">
          배달비노노를 총{" "}
          <Typography as="strong" color="orange3" fontSize="body2-b">
            {myEndDealCount}회
          </Typography>{" "}
          이용했어요!
        </Typography>
        <Box bottom="0" position="absolute" right="16">
          <Character />
        </Box>
      </Box>
    </Container>
  );
};

export default UserHead;
