import { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";

import { ComponentBaseProps } from "src/types";

import { InputCss } from "./Input.css";

interface InputBaseProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "size" | "width" | "height" | "color"
    >,
    ComponentBaseProps {
  leftNode?: ReactElement;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearClick?: VoidFunction;
  placeholder?: string;
  value?: string;
}

export type InputProps = InputCss & InputBaseProps;
