import Link from "next/link";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

export const SettingDeal = () => (
  <Box
    as={Link}
    flexDirection="row"
    href="/chat/setting-guide"
    justifyContent="space-between"
    py="8"
  >
    <Typography color="black1" fontSize="body2-b">
      공유딜 설정
    </Typography>
    <Box alignItems="center" flexDirection="row" gap="4">
      <Typography color="orange2" fontSize="body2-m">
        설정 가이드
      </Typography>
      <Icon name="arrow-right" size="12" />
    </Box>
  </Box>
);
