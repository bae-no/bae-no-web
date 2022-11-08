import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import { Typography } from "src/ui/Typography";

import Character from "./character.svg";

const UserHead = () => (
  <Container gap="16">
    <Box align="center" flexDirection="row" gap="16">
      <Avatar size="56" />
      <Typography as="h2" fontSize="headline4">
        불꽃 서규진
      </Typography>
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
          10회
        </Typography>{" "}
        이용했어요!
      </Typography>
      <Box bottom="0" position="absolute" right="16">
        <Character />
      </Box>
    </Box>
  </Container>
);

export default UserHead;
