import { useEffect, useState } from "react";

export const useTimer = (initialState: number, howOften: number = 1000) => {
  const [time, setTime] = useState<number>(initialState);
  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const reTimer = () => {
    setTime(initialState);
    setIsEnd(false);
  };
  const start = () => {
    setIsStart(true);
  };

  useEffect(() => {
    if (!isStart) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          setIsEnd(true);
          clearInterval(timer);
          return prev;
        }
        return prev - howOften;
      });
    }, howOften);
    return () => clearInterval(timer);
  }, [setTime, howOften, isEnd, isStart]);
  return { isEnd, reTimer, start, time };
};
