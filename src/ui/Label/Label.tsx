import { ReactNode } from "react";
import { Box } from "../Box";
import { LabelStyle, labelStyle } from "./Label.css";

interface Props {
  children: ReactNode;
}

export type LabelProps = Props & LabelStyle;

const Label = ({ children, variant, color }: LabelProps) => (
  <Box
    as="label"
    display={variant === "border" ? "inline-block" : "flex"}
    alignItems="center"
    justifyContent="center"
    flexDirection="row"
    className={[labelStyle({ variant, color })]}
  >
    {children}
  </Box>
);

export default Label;
