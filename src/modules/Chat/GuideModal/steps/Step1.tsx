import StepBase from "./StepBase";
import step1Lottie from "./이용가이드_1.json";

const GuideStep1 = () => (
  <StepBase
    description={`공유딜을 시작하기 전에,
    이용하는 방법에 대해서 알려드릴게요!`}
    lottieAnimation={step1Lottie}
    title="배달비 노노 공유딜 이용가이드"
  />
);

export default GuideStep1;
