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

interface AvatarProps
  extends Pick<AvatarImageProps, "alt" | "src" | "onLoadingStatusChange"> {
  iconNmae?: SvgIconKey;
  size: RootSizeType;
  text?: string;
}

const Avatar = ({
  alt,
  src,
  text,
  size,
  iconNmae,
  onLoadingStatusChange,
}: AvatarProps) => {
  const type = text ? "text" : "none";

  return (
    <Root className={avatarRootCss({ rootSize: size })}>
      <Image
        alt={alt}
        className={avatarImageCss}
        src={src}
        onLoadingStatusChange={onLoadingStatusChange}
      />
      <Fallback className={avatarFallbackCss({ size, type })}>
        {text?.[0]} {iconNmae && <Icon name={iconNmae} size="24" />}
      </Fallback>
    </Root>
  );
};
export default Avatar;
