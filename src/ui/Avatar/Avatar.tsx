import {
  Root,
  Image,
  Fallback,
  AvatarImageProps,
} from "@radix-ui/react-avatar";

import {
  avatarRootCss,
  avatarFallbackCss,
  avatarImageCss,
  RootSizeType,
} from "./Avatar.css";

interface AvatarProps
  extends Pick<AvatarImageProps, "alt" | "src" | "onLoadingStatusChange"> {
  size: RootSizeType;
  text?: string;
}

/**
 * @param size - xs: 28, sm: 40, md: 48, lg: 56, xl: 80, xxl: 96
 */
const Avatar = ({
  alt,
  src,
  text,
  size,
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
        {text?.[0]}
      </Fallback>
    </Root>
  );
};
export default Avatar;
