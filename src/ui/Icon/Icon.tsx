import { useMemo } from "react";

import clsx, { ClassValue } from "clsx";

import { ComponentBaseProps } from "src/types";

import { Sprinkles, sprinkles } from "../sprinkles.css";

import { SvgIconKey, SVG_ICON_MAP } from "./iconMap";

interface IconProps
  extends Pick<Sprinkles, "color" | "size" | "zIndex">,
    ComponentBaseProps {
  className?: ClassValue;
  name: SvgIconKey;
}

const Icon = ({
  className,
  name,
  size,
  zIndex,
  color = "black2",
  ...rest
}: IconProps) => {
  const IconComponent = useMemo(() => SVG_ICON_MAP[name], [name]);

  return (
    <IconComponent
      className={clsx(sprinkles({ color, size, zIndex }), className)}
      {...rest}
    />
  );
};

export default Icon;
