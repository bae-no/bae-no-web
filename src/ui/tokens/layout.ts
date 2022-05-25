import { size } from "./size";

export const layout = {
  auto: "auto",
  full: "100%",
  half: "50%",
  none: "0",
  fit: "fit-content",
  max: "max-content",
  min: "min-content",
  ...size,
};
