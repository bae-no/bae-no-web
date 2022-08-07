import Image from "next/image";

import { Box, Typography } from "src/ui";

import userInfoImage from "./userInfoImage.png";

const UserInfo = () => (
  <Box direction="row" gap="16" justify="space-between" px="16">
    <Box as="span" gap="8">
      <Typography fontSize="headline4">
        배달비노노배달비노노22님,{"\n"}오늘도 아껴보실거죠?
      </Typography>
      <Typography as="span" fontSize="body3-m">
        지금까지 총{" "}
        <Typography as="strong" color="orange2" fontSize="body3-m">
          1,000
        </Typography>
        원 아꼈어요.
      </Typography>
    </Box>
    <Box aria-hidden="true" as="span">
      <Image height={82} layout="fixed" src={userInfoImage} width={106} />
    </Box>
  </Box>
);

export default UserInfo;
