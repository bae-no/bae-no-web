import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

export const DetailLocationHeader = () => {
  const router = useRouter();

  return (
    <Box alignItems="center" flexDirection="row" width="full">
      <Box cursor="pointer" py="20" width="fit" onClick={() => router.back()}>
        <Icon name="arrow-left" />
      </Box>
      <Box left="0" mx="auto" position="absolute" right="0" width="fit">
        <Typography fontSize="headline5">주소 상세 정보 입력</Typography>
      </Box>
    </Box>
  );
};
