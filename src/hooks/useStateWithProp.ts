import { useEffect, useState } from "react";

export const useStateWithProp = <T>(value: T) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    setState(value);
  }, [value]);
  return [state, setState] as [T, (value: T) => void];
};
