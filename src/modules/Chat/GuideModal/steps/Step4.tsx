import StepBase from "./StepBase";
import step4Lottie from "./이용가이드_4.json";

const GuideStep4 = () => (
  <StepBase
    description={`배달 공유존에서 참여자들과
    주문한 음식을 나누세요. `}
    lottieAnimation={step4Lottie}
    title="세 번째 단계"
  />
);

export default GuideStep4;
