import { MouseEvent, ReactNode } from "react";

import { ComponentBaseProps } from "src/types";

import { SvgIconKey } from "../Icon/iconMap";

import { ButtonCss } from "./Button.css";

interface ButtonBaseProps extends ComponentBaseProps {
  children: ReactNode;
  disabled?: boolean;
  leftIconName?: SvgIconKey;
}

interface ButtonTypeProps extends ButtonBaseProps {
  href?: never;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

interface LinkTypeProps extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

export type ButtonProps = ButtonCss & (ButtonTypeProps | LinkTypeProps);
