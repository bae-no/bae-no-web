import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

export const EndDealDescription = () => (
  <Box>
    <Typography color="black2" fontSize="body1-b">
      공유딜 종료하기
    </Typography>
    <Typography color="black3" fontSize="body1-m">
      -나가기 버튼이 다시 활성화 돼요. {"\n"}
      -종료시 더 이상 채팅방 내에서 채팅이 불가해요. {"\n"}
    </Typography>
  </Box>
);
