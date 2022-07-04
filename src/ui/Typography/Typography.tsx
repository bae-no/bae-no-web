import { forwardRef, ReactNode } from "react";

import { ClassValue } from "clsx";

import { ComponentBaseProps } from "src/types";

import { Box } from "../Box";
import { FontCss, fontCss } from "../fontBase.css";
import { Sprinkles } from "../sprinkles.css";

type TypographyProps = ComponentBaseProps &
  Pick<Sprinkles, "color" | "textAlign"> &
  FontCss & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label" | "span";
    children: ReactNode;
    className?: ClassValue;
    htmlFor?: string;
  };

const Typography = forwardRef(
  (
    {
      children,
      as = "p",
      color,
      fontSize,
      className,
      textAlign,
      ...rest
    }: TypographyProps,
    ref
  ) => (
    <Box
      {...rest}
      as={as}
      className={[
        fontCss({
          fontSize,
        }),
        className,
      ]}
      color={color}
      ref={ref}
      textAlign={textAlign}
    >
      {children}
    </Box>
  )
);

export default Typography;
