import { MouseEvent, ReactNode, AriaAttributes } from "react";

import { SvgIconKey } from "../Icon/iconMap";

import { ButtonStyle } from "./Button.css";

interface ButtonBaseProps extends AriaAttributes {
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

export type ButtonProps = ButtonStyle & (ButtonTypeProps | LinkTypeProps);
