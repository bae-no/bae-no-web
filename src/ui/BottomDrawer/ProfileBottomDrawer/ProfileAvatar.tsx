import { ComponentProps } from "react";

import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

export interface ProfileAvatarProps {
  avatarProps: Omit<ComponentProps<typeof Avatar>, "size" | "text">;
  isMine?: boolean;
  onClickEditProfile?: VoidFunction;
}

const ProfileAvatar = ({
  avatarProps,
  onClickEditProfile,
  isMine,
}: ProfileAvatarProps) => (
  <Box position="relative">
    <Avatar {...avatarProps} size="80" />
    {isMine && (
      <Box
        aria-label="프로필 수정"
        as="button"
        bg="white"
        borderColor="black7"
        borderRadius="half"
        borderStyle="solid"
        borderWidth="1"
        bottom="0"
        p="4"
        position="absolute"
        right="0"
        type="button"
        onClick={onClickEditProfile}
      >
        <Icon name="editPencil" />
      </Box>
    )}
  </Box>
);

export default ProfileAvatar;
