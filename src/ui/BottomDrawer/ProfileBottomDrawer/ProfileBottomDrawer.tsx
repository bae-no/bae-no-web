import { DialogClose } from "@radix-ui/react-dialog";

import { Box } from "../../Box";
import { Button } from "../../Button";
import BottomDrawer, { BottomDrawerProps } from "../BottomDrawer";

import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";
import ProfileInfo, { ProfileInfoProps } from "./ProfileInfo";

type ProfileBottomDrawerProps = Omit<BottomDrawerProps, "children"> &
  ProfileInfoProps &
  ProfileAvatarProps;

const ProfileBottomDrawer = ({
  onOpenChange,
  open,
  trigger,
  avatarProps,
  nickname,
  description,
  onClickEditProfile,
  isMine,
  is방장,
}: ProfileBottomDrawerProps) => (
  <BottomDrawer open={open} trigger={trigger} onOpenChange={onOpenChange}>
    <Box gap="lg">
      <Box align="center" gap="md">
        <ProfileAvatar
          avatarProps={avatarProps}
          isMine={isMine}
          onClickEditProfile={onClickEditProfile}
        />
        <ProfileInfo
          description={description}
          isMine={isMine}
          is방장={is방장}
          nickname={nickname}
        />
      </Box>
      <DialogClose asChild>
        <Button>확인</Button>
      </DialogClose>
    </Box>
  </BottomDrawer>
);

export default ProfileBottomDrawer;
