import Link from "next/link";

import { Icon } from "src/ui/Icon";

const Setting = () => (
  <Link href="/user/setting" title="알림페이지">
    <Icon name="setting" />
  </Link>
);

export default Setting;
