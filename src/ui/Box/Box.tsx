import { AllHTMLAttributes, createElement, forwardRef } from "react";
import { base } from "../reset.css";
import { sprinkles, Sprinkles } from "../spakles.css";
import { parseProps } from "../utils";

export interface BoxProps
  extends Omit<
      AllHTMLAttributes<HTMLElement>,
      "content" | "translate" | "color" | "width" | "height" | "cursor" | "size"
    >,
    Sprinkles {}

const Box = forwardRef(
  (
    {
      children,
      display = "flex",
      flexDirection = "column",
      as = "div",
      className = "",
      ...props
    }: BoxProps,
    ref
  ) => {
    const [atomProps, nativeProps] = parseProps(props);

    return createElement(
      as,
      {
        className: `${sprinkles({
          ...atomProps,
          display,
          flexDirection,
        })} ${base} ${className}`,
        ...nativeProps,
        ref,
      },
      children
    );
  }
);

export default Box;
