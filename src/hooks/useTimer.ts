import { useEffect, useState } from "react";

export type TimeState = "idle" | "running" | "end";

export const useTimer = (initialState: number, howOften: number = 1000) => {
  const [time, setTime] = useState<number>(initialState);
  const [timeState, setTimeState] = useState<TimeState>("idle");
  const reRunTimer = () => {
    if (timeState === "idle") return;
    setTime(initialState);
    setTimeState("running");
  };
  const start = () => {
    if (timeState !== "idle") return;
    setTimeState("running");
  };

  useEffect(() => {
    if (timeState !== "running") return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          setTimeState("end");
          clearInterval(timer);
          return prev;
        }
        return prev - howOften;
      });
    }, howOften);
    return () => clearInterval(timer);
  }, [howOften, timeState]);

  return { reRunTimer, start, time, timeState };
};
