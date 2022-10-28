import { useEffect, useRef } from "react";

import lottie, { AnimationConfigWithData } from "lottie-web";

type LottieProps = Omit<AnimationConfigWithData, "container">;

const Lottie = (props: LottieProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = lottie.loadAnimation({
      container: ref.current,
      ...props,
    });
    animation.play();
    return () => {
      animation.destroy();
    };
  }, [props]);

  return <div ref={ref} />;
};

export default Lottie;
