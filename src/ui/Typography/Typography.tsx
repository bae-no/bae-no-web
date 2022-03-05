import { HtmlHTMLAttributes } from "react";
import { Box } from "../Box";
import { Sprinkles, sprinkles } from "../spakles.css";
import {
  fontSizes,
  fontWeights,
  typographyDefaultStyle,
} from "./Typography.css";

interface TypographyProps
  extends Pick<
      HtmlHTMLAttributes<HTMLParagraphElement>,
      "placeholder" | "children"
    >,
    Pick<Sprinkles, "color"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label";
  fontSize?: keyof typeof fontSizes;
  fontWeight?: keyof typeof fontWeights;
}

function Typography({
  children,
  as = "p",
  color,
  fontSize = 5,
  fontWeight = "regular",
  placeholder,
}: TypographyProps) {
  return (
    <Box
      as={as}
      className={`${typographyDefaultStyle} ${fontSizes[fontSize]} ${
        fontWeights[fontWeight]
      } ${sprinkles({ color })}`}
      placeholder={placeholder}
    >
      {children}
    </Box>
  );
}

export default Typography;
