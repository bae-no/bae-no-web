import { useMemo } from "react";

import { Sprinkles, sprinkles } from "../sprinkles.css";

import { SvgIconKey, SVG_ICON_MAP } from "./iconMap";

interface IconProps extends Pick<Sprinkles, "color" | "size"> {
  "aria-label"?: string;
  name: SvgIconKey;
}

const Icon = ({ name, size, color = "black2", ...rest }: IconProps) => {
  const IconComponent = useMemo(() => SVG_ICON_MAP[name], [name]);

  return <IconComponent className={sprinkles({ color, size })} {...rest} />;
}

export default Icon;