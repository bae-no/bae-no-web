import { forwardRef, HtmlHTMLAttributes } from "react";

import { Box } from "../Box";
import { Sprinkles } from "../sprinkles.css";

import { FontStyle, fontStyle } from "./Typography.css";

type TypographyProps = Pick<
  HtmlHTMLAttributes<HTMLParagraphElement>,
  "aria-label" | "children"
> &
  Pick<Sprinkles, "color"> &
  FontStyle & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label" | "span";
  };

const Typography = forwardRef(
  ({ children, as = "p", color, fontSize, ...rest }: TypographyProps, ref) => (
    <Box
      {...rest}
      as={as}
      className={fontStyle({
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
