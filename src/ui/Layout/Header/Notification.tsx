import Link from "next/link";

import { Icon } from "src/ui/Icon";

const Notification = () => (
  <Link href="/notification" title="알림페이지">
    <Icon name="bell-alarm" />
  </Link>
);

export default Notification;
