import { MouseEvent, ReactNode, AriaAttributes } from "react";
import { SvgIconKey } from "../Icon/iconMap";
import { ButtonStyle } from "./Button.css";

interface ButtonBaseProps extends AriaAttributes {
  children: ReactNode;
  leftIconName?: SvgIconKey;
  disabled?: boolean;
}

interface ButtonTypeProps extends ButtonBaseProps {
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  href?: never;
}

interface LinkTypeProps extends ButtonBaseProps {
  href: string;
  type?: never;
  onClick?: never;
}

export type ButtonProps = ButtonStyle & (ButtonTypeProps | LinkTypeProps);
