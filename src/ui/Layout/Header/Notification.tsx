import Link from "next/link";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

const Notification = () => (
  <Link href="/notification">
    <Box aria-label="알림" as="a">
      <Icon name="bell-alarm" />
    </Box>
  </Link>
);

export default Notification;
