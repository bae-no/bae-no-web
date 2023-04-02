import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import WhatIsShareDealSettingSvg from "./whatIsShareDealSetting.svg";

export const GuideTitle = () => (
  <Box alignItems="center" gap="16">
    <WhatIsShareDealSettingSvg />
    <Typography color="black2" fontSize="headline2">
      공유딜 설정이란?
    </Typography>
  </Box>
);
