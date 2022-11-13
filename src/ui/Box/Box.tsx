import {
  AllHTMLAttributes,
  ComponentType,
  createElement,
  ElementType,
  forwardRef,
} from "react";

import clsx, { ClassValue } from "clsx";

import { ComponentBaseProps } from "src/types";

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
      | "as"
    >,
    Sprinkles {
  as?: ElementType | ComponentType;
  className?: ClassValue;
  replace?: boolean; // FIXME: next 13 migration 중 임시처리
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
