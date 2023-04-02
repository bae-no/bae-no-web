import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

export const StartDealDescription = () => (
  <Box>
    <Typography color="black2" fontSize="body1-b">
      공유딜 시작하기
    </Typography>
    <Typography color="black3" fontSize="body1-m">
      -채팅방 내 인원 모두가 참여 의사가 있는 경우에 눌러주세요. {"\n"}
      -나가기 버튼이 비활성화 되어 종료전까지 서로 나갈 수 없어요. {"\n"}
      -채팅방이 마감처리되어 더 이상 다른 인원이 들어 올 수 없고, 추가 설정이
      불가합니다.
    </Typography>
  </Box>
);
