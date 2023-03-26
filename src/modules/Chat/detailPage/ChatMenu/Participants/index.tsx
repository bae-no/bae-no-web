import { ChatStatus } from "src/graphql";
import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import { ParticipantRenderRow } from "./ParticipantRenderRow";

type ParticipantsType = ChatStatus["shareDealStatus"]["participants"][number];

interface ParticipantsProps {
  participants?: ParticipantsType[];
}

export const Participants = ({ participants }: ParticipantsProps) => (
  <Box gap="16" marginTop="24">
    <Box flexDirection="row" gap="4">
      <Typography fontSize="body2-b">참여자</Typography>
      <Typography color="orange2" fontSize="body2-b">
        {participants?.length}
      </Typography>
    </Box>
    {participants?.map((participant) => (
      <ParticipantRenderRow key={participant.id} {...participant} />
    ))}
  </Box>
);
