import Link from "next/link";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

const Notification = () => (
  <Link passHref href="/notification">
    <Box as="a" title="알림페이지">
      <Icon name="bell-alarm" />
    </Box>
  </Link>
);

export default Notification;
