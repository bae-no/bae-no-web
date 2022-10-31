import StepBase from "./StepBase";
import step3Lottie from "./이용가이드_3.json";

const GuideStep3 = () => (
  <StepBase
    description={`대표자는 배달 금액 선수금 및
    주문을 진행해주세요.`}
    lottieAnimation={step3Lottie}
    title="두 번째 단계"
  />
);

export default GuideStep3;
