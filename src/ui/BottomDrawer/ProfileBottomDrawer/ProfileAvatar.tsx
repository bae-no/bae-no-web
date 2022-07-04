import { ComponentProps } from "react";

import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

export interface ProfileAvatarProps {
  avatarProps: Omit<ComponentProps<typeof Avatar>, "size">;
  isMine?: boolean;
  onClickEditProfile?: VoidFunction;
}

const ProfileAvatar = ({
  avatarProps,
  onClickEditProfile,
  isMine,
}: ProfileAvatarProps) => (
  <Box position="relative">
    <Avatar size="xl" {...avatarProps} />
    {isMine && (
      <Box
        aria-label="프로필 수정"
        as="button"
        bg="white"
        borderColor="black7"
        borderRadius="half"
        borderStyle="solid"
        borderWidth="xxxxs"
        bottom="none"
        p="xxs"
        position="absolute"
        right="none"
        type="button"
        onClick={onClickEditProfile}
      >
        <Icon name="editPencil" />
      </Box>
    )}
  </Box>
);

export default ProfileAvatar;
