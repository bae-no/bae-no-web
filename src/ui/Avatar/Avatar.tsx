import {
  Root,
  Image,
  Fallback,
  AvatarImageProps,
} from "@radix-ui/react-avatar";

import { Icon } from "../Icon";
import { SvgIconKey } from "../Icon/iconMap";

import {
  avatarRootCss,
  avatarFallbackCss,
  avatarImageCss,
  RootSizeType,
} from "./Avatar.css";

interface AvatarBaseProps
  extends Pick<AvatarImageProps, "alt" | "src" | "onLoadingStatusChange"> {
  size: RootSizeType;
}

interface AvatarTextProps extends AvatarBaseProps {
  iconName?: undefined;
  text?: string;
}

interface AvatarIconProps extends AvatarBaseProps {
  iconName?: SvgIconKey;
  text?: undefined;
}

const Avatar = ({
  alt,
  src,
  text,
  iconName,
  size,
  onLoadingStatusChange,
}: AvatarTextProps | AvatarIconProps) => {
  const type = iconName ? "none" : "text";

  return (
    <Root className={avatarRootCss({ rootSize: size })}>
      <Image
        alt={alt}
        className={avatarImageCss}
        src={src}
        onLoadingStatusChange={onLoadingStatusChange}
      />
      <Fallback className={avatarFallbackCss({ size, type })}>
        {iconName && <Icon name={iconName} size="24" />}
        {text && text[0]}
      </Fallback>
    </Root>
  );
};
export default Avatar;
