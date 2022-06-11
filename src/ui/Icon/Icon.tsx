import { useMemo } from "react";

import { Sprinkles, sprinkles } from "../sprinkles.css";
import { SvgIconKey, SVG_ICON_MAP } from "./iconMap";

interface IconProps extends Pick<Sprinkles, "color" | "size"> {
  name: SvgIconKey;
  "aria-label"?: string;
}

function Icon({ name, size, color = "black2", ...rest }: IconProps) {
  const IconComponent = useMemo(() => SVG_ICON_MAP[name], [name]);

  return <IconComponent className={sprinkles({ size, color })} {...rest} />;
}

export default Icon;
