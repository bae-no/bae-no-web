import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import MainSearchSvg from "./main-search-icon.svg";

export const MainSearchIcon = () => (
  <Box
    alignItems="center"
    left="half"
    position="absolute"
    top="half"
    transform="halfMinus"
    width="full"
  >
    <MainSearchSvg />
    <Typography textAlign="center">
      공유할 배달 음식을 찾아보세요!{"\n"}
      빨리 찾을 수록 더 따끈한 음식을 맛볼 수 있어요.
    </Typography>
  </Box>
);
