import { AllHTMLAttributes, createElement, forwardRef } from "react";

import clsx, { ClassValue } from "clsx";

import { base } from "../reset.css";
import { sprinkles, Sprinkles } from "../sprinkles.css";
import { parseProps } from "../utils";

export interface BoxProps
  extends Omit<
      AllHTMLAttributes<HTMLElement>,
      | "className"
      | "content"
      | "translate"
      | "color"
      | "width"
      | "height"
      | "cursor"
      | "size"
    >,
    Sprinkles {
  className?: ClassValue;
}

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
    const styles = clsx(
      sprinkles({
        ...atomProps,
        display,
        flexDirection,
      }),
      base,
      className
    );

    return createElement(
      as,
      {
        className: styles,
        ...nativeProps,
        ref,
      },
      children
    );
  }
);

export default Box;
