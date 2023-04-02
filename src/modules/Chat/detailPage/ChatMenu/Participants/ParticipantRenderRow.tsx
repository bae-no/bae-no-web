import { ChatStatus } from "src/graphql";
import { useToggle } from "src/hooks/useToggle";
import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import { OwnerMeLabel } from "./OwnerMeLabel";
import { UserProfileModal } from "./UserProfileModal";

type ParticipantsType = ChatStatus["shareDealStatus"]["participants"][number];
type SelectedUserInfo = Omit<ParticipantsType, "id" | "__typename">;

export const ParticipantRenderRow = ({
  introduce,
  isMe,
  isOwner,
  nickname,
}: SelectedUserInfo) => {
  const [openUserProfile, toggle] = useToggle(false);

  return (
    <>
      <Box alignItems="center" flexDirection="row" gap="8" onClick={toggle}>
        <Avatar size="40" text="tt" />
        <Box flexDirection="row" gap="4">
          <OwnerMeLabel isMe={isMe} isOwner={isOwner} />
          <Typography color="black2" fontSize="body2-b">
            {nickname}
          </Typography>
        </Box>
      </Box>
      {openUserProfile && (
        <UserProfileModal
          introduce={introduce}
          isMe={isMe}
          isOwner={isOwner}
          nickname={nickname}
          toggle={toggle}
        />
      )}
    </>
  );
};
