import { ReactNode } from "react";

import { Box } from "../Box";

import { LabelCss, labelCss } from "./Label.css";

interface Props {
  children: ReactNode;
}

export type LabelProps = Props & LabelCss;

const Label = ({ children, color, variant }: LabelProps) => (
  <Box
    alignItems="center"
    as="label"
    className={[labelCss({ color, variant })]}
    display="inline-block"
    flexDirection="row"
    justifyContent="center"
  >
    {children}
  </Box>
);

export default Label;
