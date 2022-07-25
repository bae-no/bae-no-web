import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { Box } from "src/ui/Box";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";

export interface ProfileInfoProps {
  description: string;
  isMine?: boolean;
  is방장?: boolean;
  nickname: string;
}

const ProfileInfo = ({
  description,
  nickname,
  isMine,
  is방장,
}: ProfileInfoProps) => (
  <Box align="center" gap="4">
    <Box align="center" flexDirection="row" gap="4">
      {is방장 && (
        <Label color="skyblue" variant="border">
          방장
        </Label>
      )}
      {isMine && (
        <Label color="primary" variant="border">
          나
        </Label>
      )}
      <DialogTitle asChild>
        <Typography as="span" fontSize="headline5">
          {nickname}
        </Typography>
      </DialogTitle>
    </Box>
    <DialogDescription asChild>
      <Typography color="black3" fontSize="body1-m" textAlign="center">
        {description}
      </Typography>
    </DialogDescription>
  </Box>
);

export default ProfileInfo;
