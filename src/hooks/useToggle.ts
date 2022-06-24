import { useState } from "react";

export const useToggle = (
  initialState = false,
  onToggle?: (value: boolean) => void
) => {
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setState((prev) => {
      if (onToggle) onToggle(!prev);

      return !prev;
    });
  };
  return [state, toggle] as const;
};
