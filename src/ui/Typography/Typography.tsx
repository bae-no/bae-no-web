import { forwardRef, ReactNode } from "react";

import { ComponentBaseProps } from "src/types";

import { Box } from "../Box";
import { FontCss, fontCss } from "../fontBase.css";
import { Sprinkles } from "../sprinkles.css";

type TypographyProps = ComponentBaseProps &
  Pick<Sprinkles, "color"> &
  FontCss & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label" | "span";
    children: ReactNode;
    htmlFor?: string;
  };

const Typography = forwardRef(
  ({ children, as = "p", color, fontSize, ...rest }: TypographyProps, ref) => (
    <Box
      {...rest}
      as={as}
      className={fontCss({
        fontSize,
      })}
      color={color}
      ref={ref}
    >
      {children}
    </Box>
  )
);

export default Typography;
