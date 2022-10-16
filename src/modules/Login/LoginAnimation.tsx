import { useEffect, useRef } from "react";

import Lottie from "lottie-web";

import { Box } from "src/ui";

import animationData from "./loginIconAnimation.json";

const LoginAnimation = () => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current === undefined) return;
    const animation = Lottie.loadAnimation({
      animationData,
      container: ref.current,
    });
    return () => {
      animation.destroy();
    };
  }, []);
  return <Box justifyContent="center" maxHeight="half" ref={ref} />;
};

export default LoginAnimation;
