import StepBase from "./StepBase";
import step5Lottie from "./이용가이드_5.json";

const GuideStep5 = () => (
  <StepBase
    dangerText={`*비정상적인 공유딜 마감을 하였을때는
    민형사상의 책임을 물을 수 있습니다.`}
    description={`마무리된 공유딜은
    대표자가 종료하기 처리해주세요.
    종료시, 채팅방을 나갈 수 있게됩니다.`}
    lottieAnimation={step5Lottie}
    title="마지막 단계"
  />
);

export default GuideStep5;
