import { useReastorageValue } from "@reastorage/react";

import { locationStorage } from "src/store/login";
import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

export const MoveMapGuide = () => {
  const { jibunAddress, roadAddress } = useReastorageValue(locationStorage);

  const guideText =
    jibunAddress || roadAddress
      ? "입력하신 주소지를 확인해주세요"
      : "지도를 움직여 주소지를 설정해주세요.";

  return (
    <Box
      backgroundColor="info1"
      br="8"
      position="fixed"
      px="16"
      py="8"
      width="fit"
      zIndex={1}
    >
      <Typography color="white" fontSize="body1-b">
        {guideText}
      </Typography>
    </Box>
  );
};
