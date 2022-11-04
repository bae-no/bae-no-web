import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import EmptyImg from "./empty-notification.svg";

const EmptyNotification = () => (
  <Box
    align="center"
    direction="column"
    gap="16"
    height="full"
    justify="center"
  >
    <EmptyImg />
    <Typography fontSize="body1-m">아직 알림이 없어요.</Typography>
  </Box>
);

export default EmptyNotification;
