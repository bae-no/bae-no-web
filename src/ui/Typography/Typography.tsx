import { HtmlHTMLAttributes } from "react";
import { Box } from "../Box";
import { Sprinkles, sprinkles } from "../sprinkles.css";
import { FontStyle, fontStyle } from "./Typography.css";

type TypographyProps = Pick<
  HtmlHTMLAttributes<HTMLParagraphElement>,
  "placeholder" | "children"
> &
  Pick<Sprinkles, "color"> &
  FontStyle & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label" | "span";
  };

function Typography({
  children,
  as = "p",
  color,
  fontSize,
  placeholder,
}: TypographyProps) {
  return (
    <Box
      as={as}
      className={[
        fontStyle({
          fontSize,
        }),
        sprinkles({
          color,
        }),
      ]}
      placeholder={placeholder}
    >
      {children}
    </Box>
  );
}

export default Typography;
