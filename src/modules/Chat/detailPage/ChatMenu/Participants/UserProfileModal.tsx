import { Content, Portal, Root } from "@radix-ui/react-dialog";

import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { Header, Layout } from "src/ui/Layout";
import { Typography } from "src/ui/Typography";

import { OwnerMeLabel } from "./OwnerMeLabel";
import { userProfileCss } from "./participants.css";

interface UserProfileModalProps {
  introduce: string;
  isMe: boolean;
  isOwner: boolean;
  nickname: string;
  toggle: () => void;
}

export const UserProfileModal = ({
  introduce,
  isMe,
  isOwner,
  nickname,
  toggle,
}: UserProfileModalProps) => (
  <Root defaultOpen>
    <Portal>
      <Content className={userProfileCss}>
        <Layout
          headerProps={{
            leftNode: (
              <Box cursor="pointer" onClick={toggle}>
                <Header.Close />
              </Box>
            ),
          }}
        >
          <Box
            alignItems="center"
            gap="16"
            left="half"
            position="absolute"
            top="half"
            transform="halfMinus"
          >
            <Avatar size="80" text={nickname} />
            <Box gap="4">
              <Box alignItems="center" flexDirection="row" gap="4">
                <OwnerMeLabel isMe={isMe} isOwner={isOwner} />
                <Typography fontSize="headline5">{nickname}</Typography>
              </Box>
              <Typography color="black3" fontSize="body1-m" textAlign="center">
                {introduce}
              </Typography>
            </Box>
          </Box>
        </Layout>
      </Content>
    </Portal>
  </Root>
);
