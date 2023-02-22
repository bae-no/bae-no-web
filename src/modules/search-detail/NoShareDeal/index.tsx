import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import NoShareDealSvg from "./no-share-deal.svg";

export const NoShareDeal = () => (
  <Box left="half" position="fixed" top="half" transform="halfMinus">
    <Box alignItems="center">
      <NoShareDealSvg />
      <Typography color="black2" fontSize="body1-m">
        원하시는 공유딜이 아직 없네요.{"\n"} 다른 음식을 찾아보는건 어떠신가요?
      </Typography>
    </Box>
  </Box>
);
