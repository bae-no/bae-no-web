import StepBase from "./StepBase";
import step2Lottie from "./이용가이드_2.json";

const GuideStep2 = () => (
  <StepBase
    description={`참여자들과 함께 먹을 메뉴를 정하고,
    공유딜을 시작하세요.
    공유딜 시작시, 종료전까지
    채팅방을 나갈 수 없습니다.`}
    lottieAnimation={step2Lottie}
    title="첫 번째 단계"
  />
);

export default GuideStep2;
