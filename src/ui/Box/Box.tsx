import { AllHTMLAttributes } from "react";
import { base } from "../reset.css";
import { sprinkles, Sprinkles } from "../spakles.css";
import { parseProps } from "../utils";

export interface BoxProps
  extends Omit<
      AllHTMLAttributes<HTMLElement>,
      "content" | "translate" | "color" | "width" | "height" | "cursor" | "size"
    >,
    Sprinkles {}

function Box({
  children,
  display = "flex",
  flexDirection = "column",
  as,
  ...props
}: BoxProps) {
  const [atomProps, nativeProps] = parseProps(props);

  return (
    <div
      className={`${sprinkles({
        ...atomProps,
        display,
        flexDirection,
      })} ${base}`}
      {...nativeProps}
    >
      {children}
    </div>
  );
}

export default Box;
