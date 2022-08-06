import { AllHTMLAttributes, createElement, forwardRef } from "react";

import clsx, { ClassValue } from "clsx";

import { ComponentBaseProps } from "src/types";

import { base, element } from "../reset.css";
import { sprinkles, Sprinkles } from "../sprinkles.css";
import { parseProps } from "../utils";

export interface BoxProps
  extends ComponentBaseProps,
    Omit<
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
      direction = "column",
      as = "div",
      className = "",
      ...props
    }: BoxProps,
    ref,
  ) => {
    const [atomProps, nativeProps] = parseProps(props);
    const styles = clsx(
      sprinkles({
        ...atomProps,
        direction,
        display,
      }),
      base,
      element[as as keyof typeof element],
      className,
    );

    return createElement(
      as,
      {
        className: styles,
        ...nativeProps,
        ref,
      },
      children,
    );
  },
);

export default Box;
