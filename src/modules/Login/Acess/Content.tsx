import { Box, Typography } from "src/ui";

import { LabelContent } from "./LabelAndContent";

export const Content = () => (
  <>
    <LabelContent
      alt="휴대폰 아이콘"
      iconName="phone-light"
      label="  필수적 접근 권한"
    >
      <Typography fontSize="body1-b">기기 및 앱 기록</Typography>
      <Typography color="black3" fontSize="caption1-m">
        서비스 개선 및 오류 확인
      </Typography>
    </LabelContent>
    <Box gap="8">
      <LabelContent
        alt="알람 아이콘"
        iconName="bell-normal"
        label="선택적 접근 권한"
      >
        <Box alignItems="center" flexDirection="row" gap="4">
          <Typography fontSize="body1-b">알림</Typography>
          <Typography color="black3" fontSize="caption1-m">
            (선택)
          </Typography>
        </Box>
        <Typography color="black3" fontSize="caption1-m">
          푸시 알림 및 채팅 메세지 수신 안내
        </Typography>
      </LabelContent>
      <LabelContent alt="위치 아이콘" iconName="location">
        <Box alignItems="center" flexDirection="row" gap="4">
          <Typography fontSize="body1-b">위치</Typography>
          <Typography color="black3" fontSize="caption1-m">
            (선택)
          </Typography>
        </Box>
        <Typography color="black3" fontSize="caption1-m">
          현재 위치 주변의 공유딜 검색 기능
        </Typography>
      </LabelContent>
    </Box>
    <LabelContent label="접근 권한 변경 방법">
      <Typography color="black2" fontSize="body2-m">
        휴대폰 설정 &gt; 배달비노노
      </Typography>
    </LabelContent>
    <Typography color="black3" fontSize="body3-m">
      *서비스 제공에 접근권한이 필요한 경우에만 동의를 받고 있으며, 비서용시에도
      서비스 이용이 가능합니다.
    </Typography>
  </>
);
